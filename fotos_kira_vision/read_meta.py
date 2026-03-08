import os
from PIL import Image

img_dir = 'C:/Users/PHOENIX/Dropbox/Python/kira-website/fotos_kira_vision'
for fname in os.listdir(img_dir):
    if fname.endswith(('.png', '.jpg')):
        path = os.path.join(img_dir, fname)
        try:
            img = Image.open(path)
            exif = img.getexif()
            if exif:
                print(f"\n--- {fname} ---")
                for tag, value in exif.items():
                    if tag == 40092 or tag == 37510: # XPComment, UserComment
                        if isinstance(value, bytes):
                            print(value.decode('utf-16le', errors='ignore').strip('\x00'))
                        else:
                            print(value)
        except Exception as e:
            print(f'Error reading {fname}: {e}')
