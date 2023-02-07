from flask import Flask, request
import numpy as np
from PIL import Image
from keras.models import Model
from keras.models import load_model
from flask_cors import CORS
import base64
import io

np.set_printoptions(suppress=True)
model = load_model('dogs_and_cats_humans_vgg16.h5')
 
app = Flask(__name__)
cors = CORS(app, supports_credentials=True)

@app.route("/", methods=["GET", "POST"])
def judge():
    result = ""
    file = request.form['image']
    code = base64.b64decode(file.split(',')[1])
    img = Image.open(io.BytesIO(code))
    img = img.resize((150,150))

    img = np.array(img)/255
    img_expand = img[np.newaxis, ...]
    try:
        p = model.predict(img_expand)
        # pred_list = [f"猫: {p[0][0]}", f"犬: {p[0][1]}", f"人間: {p[0][2]}"]
        # pred_str = str(pred_list)

        if p[0][0] == max(p[0]):
            result = "猫です"
        elif p[0][1] == max(p[0]):
            result = "犬です"
        else:
            result = "人間です"
    except:
        result = "画像の形式が違うため，判定できません"

    return result

if __name__ == "__main__":
    app.run(debug=True)