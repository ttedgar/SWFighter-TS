export class Border {
    public static bottomBorder(elementStyle) {
        return elementStyle.top.split('p')[0] < window.innerHeight - 100
    }
    public static topBorder(elementStyle) {
        return elementStyle.top.split('p')[0] > 30
    }
    public static rightBorder(elementStyle) {
        return elementStyle.left.split('p')[0] < window.innerWidth - 200
    }
    public static leftBorder(elementStyle) {
        return elementStyle.left.split('p')[0] > 0
    }
}