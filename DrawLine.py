import cv2
import numpy as np

# 创建一个回调函数，用于处理鼠标事件
def draw_line(event, x, y, flags, param):
    global drawing, start_x, start_y

    if event == cv2.EVENT_LBUTTONDOWN:
        drawing = True
        start_x, start_y = x, y
    elif event == cv2.EVENT_MOUSEMOVE:
        if drawing:
            cv2.line(img, (start_x, start_y), (x, y), (0, 0, 255), 2)
            start_x, start_y = x, y
    elif event == cv2.EVENT_LBUTTONUP:
        drawing = False
        cv2.line(img, (start_x, start_y), (x, y), (0, 0, 255), 2)

# 引入你的照片，和你的py文件在同一个文件夹下的Test.png
img = cv2.imread('Test.png',cv2.IMREAD_UNCHANGED)
cv2.namedWindow('MyWork')
cv2.setMouseCallback('MyWork', draw_line)

drawing = False
start_x, start_y = -1, -1

while True:
    cv2.imshow('MyWork', img)
    key = cv2.waitKey(1) & 0xFF
    if key == 27:  # 按下ESC键退出程序
        break

cv2.destroyAllWindows()