from PIL import Image
import os

def encode_image(image_path, message):

    img = Image.open(image_path)
    img = img.convert("RGB")

    pixels = img.load()

    width, height = img.size

    # Convert message → binary
    binary_message = ''.join(
        format(ord(char), '08b')
        for char in message
    )

    message_length = len(binary_message)

    # Store length (32 bits)
    length_binary = format(message_length, '032b')

    full_binary = length_binary + binary_message

    data_index = 0

    for y in range(height):

        for x in range(width):

            if data_index < len(full_binary):

                r, g, b = pixels[x, y]

                r = (r & ~1) | int(
                    full_binary[data_index]
                )

                pixels[x, y] = (r, g, b)

                data_index += 1

            else:
                break

        if data_index >= len(full_binary):
            break

    filename = os.path.basename(image_path)

    name, ext = os.path.splitext(filename)

    output_filename = name + "_encoded.png"

    output_path = os.path.join(
        "uploads",
        output_filename
    )

    img.save(output_path, "PNG")

    return output_filename