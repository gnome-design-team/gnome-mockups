import bpy

override = {'edit_text': bpy.data.texts['renderComposition.py']}
bpy.ops.text.run_script(override)
