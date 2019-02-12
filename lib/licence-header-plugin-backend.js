"use strict";
/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var theia = require("@theia/plugin");
exports.MIT_LICENSE_HEADER = '/**\n* @license MIT\n*\n/';
function start(context) {
    theia.workspace.onWillSaveTextDocument(function (fileSaveEvent) {
        console.log('File with name ', fileSaveEvent.document.fileName, ' will be saved, reason, ' + fileSaveEvent.reason);
        fileSaveEvent.waitUntil(new Promise(function (resolve, reject) {
            var document = getDocument(fileSaveEvent.document.uri);
            if (document) {
                var fileText = document.getText();
                var textEdits = [];
                if (!fileText.startsWith(exports.MIT_LICENSE_HEADER)) {
                    var licenceTextEdit = theia.TextEdit.insert(document.lineAt(0).range.start, exports.MIT_LICENSE_HEADER);
                    textEdits.push(licenceTextEdit);
                }
                resolve(textEdits);
            }
        }));
    });
}
exports.start = start;
function getDocument(fileUri) {
    return theia.workspace.textDocuments.find(function (document) {
        if (document.uri === fileUri) {
            return true;
        }
        return false;
    });
}
function stop() {
}
exports.stop = stop;
//# sourceMappingURL=licence-header-plugin-backend.js.map