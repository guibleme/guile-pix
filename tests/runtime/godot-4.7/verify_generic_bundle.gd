extends SceneTree

func _require(condition: bool, message: String) -> bool:
	if condition:
		return true
	push_error(message)
	quit(1)
	return false

func _sha256_region(image: Image, rect: Rect2i) -> String:
	var context := HashingContext.new()
	context.start(HashingContext.HASH_SHA256)
	context.update(image.get_region(rect).get_data())
	return context.finish().hex_encode()

func _initialize() -> void:
	var args := OS.get_cmdline_user_args()
	if not _require(args.size() == 1, "Expected one bundle directory"):
		return
	var bundle_dir: String = args[0]
	var manifest = JSON.parse_string(FileAccess.get_file_as_string(bundle_dir.path_join("manifest.json")))
	if not _require(manifest is Dictionary, "Manifest must be an object"):
		return
	var frames: Array = manifest["frames"]
	var meta: Dictionary = manifest["meta"]
	var tag: Dictionary = meta["frameTags"][0]
	if not _require(frames.size() > 0 and int(tag["to"]) == frames.size() - 1, "Generic frame tag range mismatch"):
		return
	var image := Image.new()
	if not _require(image.load(bundle_dir.path_join("atlas.png")) == OK, "Could not load generic atlas"):
		return
	if not _require(image.get_width() == int(meta["size"]["w"]) and image.get_height() == int(meta["size"]["h"]) and image.get_format() == Image.FORMAT_RGBA8, "Generic atlas metadata mismatch"):
		return
	var texture := ImageTexture.create_from_image(image)
	var sprite_frames := SpriteFrames.new()
	if sprite_frames.has_animation("default"):
		sprite_frames.remove_animation("default")
	var animation_name: StringName = StringName(tag["name"])
	sprite_frames.add_animation(animation_name)
	sprite_frames.set_animation_speed(animation_name, 100.0)
	sprite_frames.set_animation_loop_mode(animation_name, SpriteFrames.LOOP_NONE if tag["loop"] == "once" else SpriteFrames.LOOP_LINEAR)
	var hashes: Array = meta["guile_pix"]["framePixelHashes"]
	for index in range(frames.size()):
		var entry: Dictionary = frames[index]
		var packed: Dictionary = entry["frame"]
		var rect := Rect2i(packed["x"], packed["y"], packed["w"], packed["h"])
		if not _require(_sha256_region(image, rect) == hashes[index], "Generic frame hash mismatch %d" % index):
			return
		var atlas_frame := AtlasTexture.new()
		atlas_frame.atlas = texture
		atlas_frame.region = Rect2(rect)
		atlas_frame.filter_clip = true
		sprite_frames.add_frame(animation_name, atlas_frame, float(entry["duration"]) / 10.0)
		if not _require(is_equal_approx(sprite_frames.get_frame_duration(animation_name, index) / sprite_frames.get_animation_speed(animation_name), float(entry["duration"]) / 1000.0), "Generic duration mismatch %d" % index):
			return
	var pivot: Dictionary = meta["slices"][0]["keys"][0]["pivot"]
	var sprite := AnimatedSprite2D.new()
	sprite.sprite_frames = sprite_frames
	sprite.texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST
	sprite.offset = Vector2(float(frames[0]["sourceSize"]["w"]) / 2.0 - float(pivot["x"]), float(frames[0]["sourceSize"]["h"]) / 2.0 - float(pivot["y"]))
	get_root().add_child(sprite)
	sprite.play(animation_name)
	if not _require(sprite.is_playing() and sprite.animation == animation_name and sprite.texture_filter == CanvasItem.TEXTURE_FILTER_NEAREST, "Generic animation did not play"):
		return
	print("GODOT_GENERIC_BUNDLE_OK bundleHash=%s" % meta["guile_pix"]["bundleHash"])
	quit(0)
