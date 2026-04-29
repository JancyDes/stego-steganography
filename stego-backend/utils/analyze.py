from PIL import Image
import numpy as np


def chi_square_test(channel):

    histogram = np.histogram(
        channel,
        bins=256,
        range=(0, 256)
    )[0]

    chi = 0

    for i in range(0, 256, 2):

        o1 = histogram[i]
        o2 = histogram[i + 1]

        expected = (o1 + o2) / 2

        if expected > 0:

            chi += (
                (o1 - expected) ** 2 +
                (o2 - expected) ** 2
            ) / expected

    return chi


def lsb_density(channel):

    lsb = channel & 1

    ones = np.sum(lsb)

    total = lsb.size

    ratio = ones / total

    deviation = abs(0.5 - ratio)

    return deviation * 100


def analyze_image(image_path):

    img = Image.open(image_path)
    img = img.convert("RGB")

    pixels = np.array(img)

    r = pixels[:, :, 0]
    g = pixels[:, :, 1]
    b = pixels[:, :, 2]

    # --- Chi-square detection ---

    chi_r = chi_square_test(r)
    chi_g = chi_square_test(g)
    chi_b = chi_square_test(b)

    chi_avg = (chi_r + chi_g + chi_b) / 3

    chi_score = chi_avg / 500


    # --- LSB density detection ---

    density_r = lsb_density(r)
    density_g = lsb_density(g)
    density_b = lsb_density(b)

    density_score = (
        density_r +
        density_g +
        density_b
    ) / 3


    # --- Combined score ---

    final_score = (

        chi_score +
        density_score

    ) / 2


    # --- Stronger thresholds ---

    if final_score < 3:

        risk = "Low"

    elif final_score < 10:

        risk = "Medium"

    else:

        risk = "High"


    return {

        "risk": risk,
        "score": round(final_score, 2)

    }