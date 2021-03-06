import * as assert from "assert";
import * as vs from "vscode";
import { activate, ensureDocumentSymbol, everythingFile, getDocumentSymbols } from "../../helpers";
import _ = require("lodash");

describe("document_symbol_provider", () => {

	beforeEach("activate everythingFile", () => activate(everythingFile));

	it("returns expected items for 'everything.dart'", async () => {
		const symbols = await getDocumentSymbols();

		ensureDocumentSymbol(symbols, "MyClass", vs.SymbolKind.Class);
		ensureDocumentSymbol(symbols, "myNumField", vs.SymbolKind.Field, "MyClass");
		ensureDocumentSymbol(symbols, "myNumGetter", vs.SymbolKind.Property, "MyClass");
		ensureDocumentSymbol(symbols, "myNumSetter", vs.SymbolKind.Property, "MyClass");
		ensureDocumentSymbol(symbols, "myFutureString", vs.SymbolKind.Field, "MyClass");
		ensureDocumentSymbol(symbols, "myHttpClient", vs.SymbolKind.Field, "MyClass");
		ensureDocumentSymbol(symbols, "MyClass", vs.SymbolKind.Constructor, "MyClass");
		ensureDocumentSymbol(symbols, "MyClass.myNamed", vs.SymbolKind.Constructor, "MyClass");
		ensureDocumentSymbol(symbols, "myVoidReturningMethod", vs.SymbolKind.Method, "MyClass");
		ensureDocumentSymbol(symbols, "myStringReturningMethod", vs.SymbolKind.Method, "MyClass");
		ensureDocumentSymbol(symbols, "methodTakingString", vs.SymbolKind.Method, "MyClass");
		ensureDocumentSymbol(symbols, "methodTakingFunction", vs.SymbolKind.Method, "MyClass");
		ensureDocumentSymbol(symbols, "doSomeStuff", vs.SymbolKind.Function);
		assert.equal(symbols.length, 13);
	});
});
