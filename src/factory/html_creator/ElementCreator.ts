export class ElementCreator {
    public static appendElement(
        parent: HTMLElement,
        tagName: string,
        classes: string | string[] | null,
        text: string | null,
        attributes: Record<string, string | number>
    ): HTMLElement {
        const elementName: HTMLElement = document.createElement(tagName);
        parent.appendChild(elementName);
        if (classes) {
            if (typeof classes === 'string') {
                classes = [classes];
            }
            for (const className of classes) {
                elementName.classList.add(className);
            }
        }
        if (text) {
            elementName.textContent = text;
        }
        for (const attribute in attributes) {
            elementName[attribute] = attributes[attribute];
        }
        return elementName;
    }
}