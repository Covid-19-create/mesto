export class Section {
    constructor(data, { renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._arrCards = data;
    }

    render() {
        this._arrCards.reverse().forEach((item) => {
            this._renderer(item)
        })
    }

    addItem(element) {
        this._containerSelector.append(element);
    }
}