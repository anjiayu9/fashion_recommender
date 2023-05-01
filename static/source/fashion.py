import json
import itertools

def complementary(color):
    colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black', 'White', 'Grey']
    color_index = colors.index(color)
    return colors[(color_index + len(colors) // 2) % len(colors)]

def analogous(color):
    colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White', 'Grey']
    color_index = colors.index(color)
    return colors[(color_index - 1) % len(colors)], colors[(color_index + 1) % len(colors)]

def triadic(color):
    colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White', 'Grey']
    color_index = colors.index(color)
    return colors[(color_index + len(colors) // 3) % len(colors)], colors[(color_index + 2 * len(colors) // 3) % len(colors)]

clothing_types = ["T-Shirt", "Longsleeve", "Pants", "Shoes", "Shirt", "Dress", "Outwear", "Shorts", "Hat", "Skirt", "Polo", "Undershirt", "Blazer", "Hoodie", "Top", "Blouse"]
colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Black', 'White', 'Grey']

data = []
for clothing_type, color in itertools.product(clothing_types, colors):
    related_clothing = []
    related_clothing.append({"clothing_type": "Pants" if clothing_type != "Pants" else "Shirt", "color": complementary(color)})
    related_clothing.append({"clothing_type": "Shoes" if clothing_type != "Shoes" else "Hat", "color": analogous(color)[0]})
    related_clothing.append({"clothing_type": "Hat" if clothing_type != "Hat" else "Shoes", "color": analogous(color)[1]})
    data.append({"clothing_type": clothing_type, "color": color, "related_clothing": related_clothing})

with open('suggestions.json', 'w') as f:
    json.dump(data, f, indent=4)
