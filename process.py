import sys
import cv2
import pytesseract
import os

path = sys.argv[1]

pytesseract.pytesseract.tesseract_cmd = "D:/Tesseract/tesseract.exe"
img = cv2.imread(path)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
ans = pytesseract.image_to_string(img)
if(len(ans) > 0): print(ans)
os.remove(path)
