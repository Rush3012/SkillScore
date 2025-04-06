import cv2
import numpy as np

# Original 4x4 grayscale image
image = np.array([
    [42, 50, 80, 80],
    [50, 50, 80, 80],
    [100, 100, 200, 200],
    [100, 100, 200, 200]
], dtype=np.uint8)

# Define a 3x3 Gaussian kernel
gaussian_kernel = (1/16) * np.array([
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]
])

# Apply Gaussian filter using cv2
smoothed_image = cv2.filter2D(image, -1, gaussian_kernel)

# Display the smoothed image
print(smoothed_image)

