import { readdir } from "fs/promises";
import { relative, resolve } from "path";
export async function* recursiveDirectoryIterator(path, root = path) {
    const entries = await readdir(path, { withFileTypes: true });
    for (const entry of entries) {
        const rtn = resolve(path, entry.name);
        if (entry.isDirectory()) {
            yield* recursiveDirectoryIterator(rtn, root);
        }
        else {
            yield { absolute: rtn, relative: relative(root, rtn) };
        }
    }
}
