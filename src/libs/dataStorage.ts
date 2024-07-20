export function saveData<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function loadData<T,RawT>(key: string, defvalue: T, restore?: (raw: RawT) => T): T {
    const storedData = localStorage.getItem(key)
    if (storedData)
        try {
            const obj = JSON.parse(storedData) as RawT
            return restore ? restore(obj) : (obj as unknown) as T
        } catch (_e) {
        }
    return defvalue
}