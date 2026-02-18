export class Border {
    public static bottomBorder(elementStyle: CSSStyleDeclaration): boolean {
        return elementStyle.top.split('p')[0] < window.innerHeight - 100
    }
    public static topBorder(elementStyle: CSSStyleDeclaration): boolean {
        return elementStyle.top.split('p')[0] > 30
    }
    public static rightBorder(elementStyle: CSSStyleDeclaration): boolean {
        return elementStyle.left.split('p')[0] < window.innerWidth - 200
    }
    public static leftBorder(elementStyle: CSSStyleDeclaration): boolean {
        return elementStyle.left.split('p')[0] > 0
    }
}