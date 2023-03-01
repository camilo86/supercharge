# Supercharge

Utility commands to supercharge your VSCode experience

## Features

Superchage includes various commands that you may find useful while coding.

### Commands

| Commands           | Description               | How to run                                  |
|--------------------|---------------------------|---------------------------------------------|
| Decode base64      | Decodes a text to base64  | Run as command from input or text selection |
| Encode base64      | Encodes a text to base64  | Run as command from input or text selection |
| Decode JWT         | Decodes a JSON Web Token  | Run as command from input or text selection |
| Generate GUID/UUID | Creates a new random GUID | Run as command from input or text selection |

## How to use

To run a command in VSCode:

1. Open command palette by going to `View > Command Palette` or by using the keyboard shortcut `CTRL+SHIFT+P`
2. Type the supercharge command you would like to run.
    - Supercharge commands starts with `supercharge:` prefix, for example `supercharge: Decode base64`.
3. Profit

**Pro tip:** Many commands can be run inline (text selection). So for example, say have a long string in a document that you would like to encode in base64; you could select such text, open the command pallete, and run the `supercharge: Encode base64`. This will replace the selected text with its base64 representation. By the way, this works for multiple text selections as well!


## Release Notes

### 0.0.1

Initial release of supercharge.

## Contributing

So you know: I'm working on this on my free time so I'm not checking this repo 24/7. 

Anyhow, if you would like to add a useful command or request a feature, please open up a pull request with the details 😊.