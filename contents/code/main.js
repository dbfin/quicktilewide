// Whether already on Plasma 6
const plasma6 = typeof workspace.windowList === 'function'

/**
 * Represents the geometry of a rectangle in grid or pixel units
 */
class Geometry {
    /**
     * 
     * @param {number} x - The x-coordinate of the upper left corner
     * @param {number} y - The y-coordinate of the upper left corner
     * @param {number} width - The width of the rectangle
     * @param {number} height - The height of the rectangle
     */
    constructor (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}

/**
 * Returns the active window
 * 
 * @returns The active window
 */
function getActiveWindow() {
    return plasma6 ? workspace.activeWindow : workspace.activeClient
}

/**
 * Returns the coordinate in pixels based on the coordinate in grid units
 * 
 * @param {number} guCoordinate - The coordinate in grid units
 * @param {number} guSize - The size in grid units
 * @param {number} pxSize - The size in pixels
 * @returns The resulting coordinate in pixels
 */
function gridToPixelUnits(guCoordinate, guSize, pxSize) {
    return Math.round(guCoordinate * pxSize / guSize)
}

/**
 * Returns the geometry in pixels based on the geometry in grid units
 * 
 * @param {Geometry} guGeometry - The geometry in grid units
 * @param {Geometry} guArea - The geometry of the total placement area in grid units
 * @param {Geometry} pxArea - The geometry of the total placement area in pixels
 * @returns The resulting geometry in pixels
 */
function gridToPixelGeometry(guGeometry, guArea, pxArea) {
    const x0 = gridToPixelUnits(guGeometry.x, guArea.width, pxArea.width)
    const x1 = gridToPixelUnits(guGeometry.x + guGeometry.width, guArea.width, pxArea.width)
    const y0 = gridToPixelUnits(guGeometry.y, guArea.height, pxArea.height)
    const y1 = gridToPixelUnits(guGeometry.y + guGeometry.height, guArea.height, pxArea.height)
    return { x: pxArea.x + x0, y: pxArea.y + y0, width: x1 - x0, height: y1 - y0 }
}

/**
 * Places the active window using the provided geometry in grid units
 * 
 * @param {Geometry} guGeometry - The geometry in grid units
 * @param {Geometry} guArea - The geometry of the total placement area in grid units
 */
function placeWindow(guGeometry, guArea) {
    window = getActiveWindow()
    if (!(window.normalWindow || window.dialog || window.utility)) return
    window.setMaximize(false, false)
    window.frameGeometry = gridToPixelGeometry(guGeometry, guArea, workspace.clientArea(KWin.PlacementArea, window))
}

/**
 * Adds a shortcut to place the active window at a specific position in grid units
 * 
 * @param {string} text - The name and message for the shortcut
 * @param {string} shortcut - The shortcut
 * @param {Geometry} guGeometry - The geometry in grid units
 * @param {Geometry} guArea - The geometry of the total placement area in grid units (default: 6 by 2)
 */
function addShortcut(text, shortcut, guGeometry, guArea = new Geometry(0, 0, 6, 2)) {
    registerShortcut(text, text, shortcut, () => placeWindow(guGeometry, guArea))
}

// Main

addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Bottom Left", "Meta+Num+1", new Geometry(0, 1, 2, 1))
addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Bottom Middle", "Meta+Num+2", new Geometry(2, 1, 2, 1))
addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Bottom Right", "Meta+Num+3", new Geometry(4, 1, 2, 1))
addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Left", "Meta+Num+4", new Geometry(0, 0, 2, 2))
addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Middle", "Meta+Num+5", new Geometry(2, 0, 2, 2))
addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Right", "Meta+Num+6", new Geometry(4, 0, 2, 2))
addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Top Left", "Meta+Num+7", new Geometry(0, 0, 2, 1))
addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Top Middle", "Meta+Num+8", new Geometry(2, 0, 2, 1))
addShortcut("Quick Tile Wide: ⎹⇠⅓⇢⎸ Top Right", "Meta+Num+9", new Geometry(4, 0, 2, 1))

addShortcut("Quick Tile Wide: ⎹⇠⅔⇢⎸ Bottom Left", "Meta+Ctrl+Num+1", new Geometry(0, 1, 4, 1))
addShortcut("Quick Tile Wide: Full Width Bottom", "Meta+Ctrl+Num+2", new Geometry(0, 1, 6, 1))
addShortcut("Quick Tile Wide: ⎹⇠⅔⇢⎸ Bottom Right", "Meta+Ctrl+Num+3", new Geometry(2, 1, 4, 1))
addShortcut("Quick Tile Wide: ⎹⇠⅔⇢⎸ Left", "Meta+Ctrl+Num+4", new Geometry(0, 0, 4, 2))
addShortcut("Quick Tile Wide: Full Width and Height", "Meta+Ctrl+Num+5", new Geometry(0, 0, 6, 2))
addShortcut("Quick Tile Wide: ⎹⇠⅔⇢⎸ Right", "Meta+Ctrl+Num+6", new Geometry(2, 0, 4, 2))
addShortcut("Quick Tile Wide: ⎹⇠⅔⇢⎸ Top Left", "Meta+Ctrl+Num+7", new Geometry(0, 0, 4, 1))
addShortcut("Quick Tile Wide: FUll Width Top", "Meta+Ctrl+Num+8", new Geometry(0, 0, 6, 1))
addShortcut("Quick Tile Wide: ⎹⇠⅔⇢⎸ Top Right", "Meta+Ctrl+Num+9", new Geometry(2, 0, 4, 1))
