import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

async function getDocument() {
  const file = await fs.readFile(path.join(process.cwd(), "content", "docs", "deployment.md"), "utf-8");
  return file;
}

export default async function DeploymentDocPage() {
  const markdown = await getDocument();
  const html = marked.parse(markdown);
  return (
    <div className="bg-slate-950 py-16">
      <div className="prose prose-invert mx-auto max-w-4xl px-6">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
