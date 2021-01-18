const _getDOMElem = (attribute, value) => document.querySelector(`[${attribute}='${value}']`);

export const mapListToDOMElements = (list, attribute) => {
    const _viewElems = {};

    list.forEach((value) => {
        _viewElems[value] = _getDOMElem(attribute, value);
    });

    return _viewElems;
}