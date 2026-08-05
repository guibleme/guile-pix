extends SceneTree

func _initialize() -> void:
	call_deferred("_verify")

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

func _verify() -> void:
	var args := OS.get_cmdline_user_args()
	if not _require(args.size() == 1, "Expected one bundle directory argument"):
		return
	var bundle_dir: String = args[0]
	var atlas_path := bundle_dir.path_join("atlas.png")
	var manifest_path := bundle_dir.path_join("manifest.json")
	if not _require(FileAccess.file_exists(atlas_path) and FileAccess.file_exists(manifest_path), "Bundle files are missing"):
		return

	var parsed = JSON.parse_string(FileAccess.get_file_as_string(manifest_path))
	if not _require(parsed is Dictionary, "Manifest JSON must be an object"):
		return
	var manifest: Dictionary = parsed
	var frames: Array = manifest["frames"]
	var meta: Dictionary = manifest["meta"]
	if not _require(frames.size() == 4, "Expected four frames"):
		return
	var frame_tag: Dictionary = meta["frameTags"][0]
	if not _require(frame_tag["name"] == "walk_right" and frame_tag["from"] == 0 and frame_tag["to"] == 3 and frame_tag["direction"] == "forward", "Unexpected walk_right frame tag"):
		return

	var image := Image.new()
	if not _require(image.load(atlas_path) == OK, "Could not load unchanged atlas PNG"):
		return
	if not _require(image.get_width() == 64 and image.get_height() == 16 and image.get_format() == Image.FORMAT_RGBA8, "Atlas must be 64x16 RGBA8"):
		return
	var image_texture := ImageTexture.create_from_image(image)
	var sprite_frames := SpriteFrames.new()
	if sprite_frames.has_animation("default"):
		sprite_frames.remove_animation("default")
	sprite_frames.add_animation("walk_right")
	sprite_frames.set_animation_speed("walk_right", 10.0)
	sprite_frames.set_animation_loop_mode("walk_right", SpriteFrames.LOOP_LINEAR)

	var expected_hashes: Array = meta["guile_pix"]["framePixelHashes"]
	for index in range(4):
		var entry: Dictionary = frames[index]
		var rect_data: Dictionary = entry["frame"]
		var rect := Rect2i(rect_data["x"], rect_data["y"], rect_data["w"], rect_data["h"])
		if not _require(rect == Rect2i(index * 16, 0, 16, 16), "Unexpected frame region/order at index %d" % index):
			return
		if not _require(entry["duration"] == 100 and not entry["rotated"] and not entry["trimmed"], "Unexpected frame timing/packing at index %d" % index):
			return
		if not _require(_sha256_region(image, rect) == expected_hashes[index], "Frame pixels changed at index %d" % index):
			return
		var atlas_frame := AtlasTexture.new()
		atlas_frame.atlas = image_texture
		atlas_frame.region = Rect2(rect)
		atlas_frame.filter_clip = true
		sprite_frames.add_frame("walk_right", atlas_frame, float(entry["duration"]) / 100.0)

	if not _require(sprite_frames.get_frame_count("walk_right") == 4, "SpriteFrames count mismatch"):
		return
	if not _require(sprite_frames.get_animation_loop_mode("walk_right") == SpriteFrames.LOOP_LINEAR, "SpriteFrames loop mismatch"):
		return
	for index in range(4):
		var texture := sprite_frames.get_frame_texture("walk_right", index) as AtlasTexture
		if not _require(texture != null and texture.region == Rect2(index * 16, 0, 16, 16), "SpriteFrames texture region mismatch"):
			return
		var absolute_duration := sprite_frames.get_frame_duration("walk_right", index) / sprite_frames.get_animation_speed("walk_right")
		if not _require(is_equal_approx(absolute_duration, 0.1), "SpriteFrames duration mismatch"):
			return

	var pivot: Dictionary = meta["slices"][0]["keys"][0]["pivot"]
	var sprite := AnimatedSprite2D.new()
	sprite.sprite_frames = sprite_frames
	sprite.texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST
	sprite.offset = Vector2(8 - int(pivot["x"]), 8 - int(pivot["y"]))
	get_root().add_child(sprite)
	sprite.play("walk_right")
	if not _require(sprite.texture_filter == CanvasItem.TEXTURE_FILTER_NEAREST, "Nearest filtering was not preserved"):
		return
	if not _require(sprite.offset == Vector2(0, -7), "Pivot-derived offset mismatch"):
		return
	if not _require(sprite.is_playing() and sprite.animation == &"walk_right", "AnimatedSprite2D did not play walk_right"):
		return

	print("GODOT_BUNDLE_OK bundleHash=%s" % meta["guile_pix"]["bundleHash"])
	quit(0)
