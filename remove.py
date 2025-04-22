from rembg import remove
from PIL import Image
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

inp = Image.open(input_path)
out_img = remove(inp)
out_img.save(output_path)
print("✅ Background berhasil dihapus dan disimpan.")
