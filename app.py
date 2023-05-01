from flask import Flask, render_template, request
from PIL import Image
import numpy as np
import cv2
from sklearn.cluster import KMeans
import torch
import sys
from fastai.learner import load_learner  # import load_learner

def get_x(r):
    img_path = './images_compressed/' + r['image']
    try:
        Image.open(img_path)
        return img_path
    except UnidentifiedImageError:
        print(f"Image at path {img_path} could not be opened with PIL. Skipping.")
        return None

def get_y(r):
    return r['label_cat'].split(' ')

app = Flask(__name__)


def get_main_colors(image, num_colors=3):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros_like(image)
    for contour in contours:
        cv2.drawContours(mask, [contour], 0, (255, 255, 255), -1)
    masked_image = cv2.bitwise_and(image, mask)
    pixels = masked_image.reshape(-1, 3)
    kmeans = KMeans(n_clusters=num_colors)
    kmeans.fit(pixels)
    main_colors_rgb = kmeans.cluster_centers_.astype(int)
    main_colors_hex = ['#%02x%02x%02x' % (r, g, b) for r, g, b in main_colors_rgb]
    return main_colors_hex

@app.route('/', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        img = Image.open(file.stream)
        img.save('static/upload.png')
        image_np = np.array(img)
        image_bgr = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

        model = load_learner('export.pkl', cpu=True)  # load the model onto CPU
        pred, _, _ = model.predict(img)
        print(f'This is a {pred}')

        main_colors = get_main_colors(image_bgr, 3)
        return render_template('result.html', pred=pred, img_path='upload.png', main_colors=main_colors)

    return render_template('upload.html')


if __name__ == '__main__':
    app.run(port=5000)
