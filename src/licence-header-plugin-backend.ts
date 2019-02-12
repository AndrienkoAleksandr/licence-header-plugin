/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import * as theia from '@theia/plugin';

export const MIT_LICENSE_HEADER = '/**\n* @license MIT\n*\n/';

export function start(context: theia.PluginContext) {
    theia.workspace.onWillSaveTextDocument((fileSaveEvent: theia.TextDocumentWillSaveEvent) => {
        console.log('File with name ', fileSaveEvent.document.fileName, ' will be saved, reason, ' + fileSaveEvent.reason);

        fileSaveEvent.waitUntil(new Promise<theia.TextEdit[]>((resolve, reject) => {
            const document = getDocument(fileSaveEvent.document.uri);

            if (document) {
                const fileText = document.getText();

                const textEdits: theia.TextEdit[] = [];
                if (!fileText.startsWith(MIT_LICENSE_HEADER)) {
                    const licenceTextEdit = theia.TextEdit.insert(document.lineAt(0).range.start, MIT_LICENSE_HEADER);
                    textEdits.push(licenceTextEdit);
                }

                resolve(textEdits);
            }
        }));
    });
}

function getDocument(fileUri: theia.Uri): theia.TextDocument | undefined {
    return theia.workspace.textDocuments.find((document) => {
        if (document.uri === fileUri) {
            return true;
        }
        return false;
    });
}


export function stop() {
}

