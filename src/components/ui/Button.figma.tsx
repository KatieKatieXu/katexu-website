/**
 * Code Connect mapping for Button.
 *
 * This file is never bundled into the app. It tells Figma:
 * "the Button component on the canvas equals this code component,
 * and here is how canvas properties map to props."
 *
 * Setup (once you have the Figma component):
 * 1. In Figma, create a Button component with variant properties:
 *    Variant (Primary / Secondary / Ghost), Size (Small / Medium / Large),
 *    booleans "Disabled" and "Has icon", a text layer "Label",
 *    and an instance-swap slot "Icon".
 * 2. Replace FILE_KEY and node-id below with the real component URL
 *    (right-click component → Copy link to selection).
 * 3. Run: npx figma connect publish --token <FIGMA_ACCESS_TOKEN>
 * 4. Open Dev Mode, select any Button instance → the panel shows the
 *    real <Button /> call with props matching the canvas.
 */
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(
  Button,
  "https://www.figma.com/design/FILE_KEY/Design-System?node-id=1-2",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
        Ghost: "ghost",
      }),
      size: figma.enum("Size", {
        Small: "sm",
        Medium: "md",
        Large: "lg",
      }),
      disabled: figma.boolean("Disabled"),
      label: figma.string("Label"),
      iconLeft: figma.boolean("Has icon", {
        true: figma.instance("Icon"),
        false: undefined,
      }),
    },
    example: ({ variant, size, disabled, label, iconLeft }) => (
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        label={label}
        iconLeft={iconLeft}
      />
    ),
  }
);
