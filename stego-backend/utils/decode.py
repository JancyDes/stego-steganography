from PIL import Image

def decode_image(image_path):

    img = Image.open(image_path)
    img = img.convert("RGB")

    pixels = img.load()

    width, height = img.size

    binary_data = ""

    pixel_list = []

    # Flatten pixels
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            pixel_list.append(r)

    # Step 1 — Read length (first 32 bits)

    length_bits = ""

    for i in range(32):
        length_bits += str(
            pixel_list[i] & 1
        )

    message_length = int(
        length_bits,
        2
    )

    # Step 2 — Read message bits

    message_bits = ""

    for i in range(
        32,
        32 + message_length
    ):
        message_bits += str(
            pixel_list[i] & 1
        )

    # Step 3 — Convert binary → text

    decoded_message = ""

    for i in range(
        0,
        len(message_bits),
        8
    ):

        byte = message_bits[i:i+8]

        decoded_message += chr(
            int(byte, 2)
        )

    return decoded_message