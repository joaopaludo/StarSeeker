const { app, BrowserWindow } = require("electron");
const serve = require("electron-serve");
const path = require("path");

dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../.env") });

const appServe = app.isPackaged
    ? serve({
          directory: path.join(__dirname, "../out"),
      })
    : null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            // devTools: false,
        },
        autoHideMenuBar: true,
    });

    if (app.isPackaged) {
        appServe(win).then(() => {
            win.loadURL("app://-");
        });
    } else {
        win.loadURL("https://localhost:3000");
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
};

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
