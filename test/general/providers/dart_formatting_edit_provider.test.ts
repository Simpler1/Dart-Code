import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import * as vs from "vscode";
import { activate, doc, setTestContent, editor } from "../../helpers";

describe("dart_formatting_edit_provider", () => {

	before(async () => activate());

	async function formatDocument(): Promise<void> {
		const formatResult = await (vs.commands.executeCommand("vscode.executeFormatDocumentProvider", doc.uri) as Thenable<vs.TextEdit[]>);
		assert.ok(formatResult);
		assert.ok(formatResult.length);
		await editor.edit((b) => formatResult.forEach((f) => b.replace(f.range, f.newText)));
	}

	it("formats the document", async () => {
		setTestContent("   main ( ) {\n\n}");
		await formatDocument();
		// insertFinalNewline is on for test project
		assert.equal(doc.getText(), "main() {}\n");
	});
});