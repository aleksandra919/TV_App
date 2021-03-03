const _getDOMElem = (attribute, value) => document.querySelector(`[${attribute}='${value}']`);

export const mapListToDOMElements = (list, attribute) => {
    const _viewElems = {};

    list.forEach((value) => {
        _viewElems[value] = _getDOMElem(attribute, value);
    });

    return _viewElems;
}

export const createDOMElem = (tagName, className, innerText, src) => {
    const tag = document.createElement(tagName);
    tag.classList = className;

    if(src) tag.src = src;
    if(innerText) tag.innerText = innerText;

    return tag
}