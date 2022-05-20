export default function cloneObject(objToCopy, objBase = {}) {
    return Object.assign(objBase, JSON.parse(JSON.stringify(objToCopy)))
}