export default function cloneObject(obj, oldObject = {}) {
    return Object.assign(oldObject, JSON.parse(JSON.stringify(obj)))
}