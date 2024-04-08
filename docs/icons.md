---
title: Generate Icons
sidebar_label: Icons
slug: icons
custom_edit_url: null
---

SVG icons to be used in the project are stored under the `src/assets/icons` folder.

```sh
There are two different methods that can be used for icon usage.

1. Icons can be used by generating an SVG Sprite.

2. Icon fonts can be generated and used by using the VS Code extension developed by the Project Zero Team.
```

### Steps for Generating an Icon Font 

1. Obtain and install the VS Code extension.

2. Add the SVG icons you want to convert to an icon font under the `src/assets/icons` folder.

3. Inside VS Code, open the command palette screen by using the shortcut `CMD + SHIFT + P` (or `CTRL + SHIFT + P`).

4. In the command palette screen, run the `Generate Icons` command.

5. After running the command, you will find the relevant files starting with `pz-icon` generated under the `src/assets/fonts` folder.

6. Icon can now be used along with its name within the `<Icon>` component to generate the icon font.

## Usage of the Icon Component

Import the Icon component into the file where you want to use it.

```sh
import { Icon } from '../components';
```

Call the imported component within your page.

```sh
<Icon name="akinon" size={34} className="text-red" />
```

Props that the Icon component accepts:

-   **`name` (string):** The name of the icon you want to use. This prop is mandatory.

-   **`size` (number):** Used to specify the size of the icon. The default value is 18px.

-   **`className` (string):** Used for additional styling for the icon (e.g., color).