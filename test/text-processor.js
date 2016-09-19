import test from 'ava';

import TextProcessor from '../src/lib/text-processor';

test('removeYamlFrontMatter does not change text with no YAML front matter', t => {
  const text = 'This is a test.';

  const result = TextProcessor.removeYamlFrontMatter(text);

  t.is(result, text);
});

test('removeYamlFrontMatter removes YAML front matter', t => {
  const text = `---
title: "Test Title"
---

This is a test.`;

  const result = TextProcessor.removeYamlFrontMatter(text);

  t.is(result, 'This is a test.');
});

test('markdownToText adds trailing newline if one is not provided', t => {
  // This test is to document the observed behavior.

  const text = 'This is a test.';

  const result = TextProcessor.markdownToText(text);

  t.is(result, `${text}\n`);
});

test('markdownToText does not modify simple non-markdown text', t => {
  const text = 'This is a test.\n';

  const result = TextProcessor.markdownToText(text);

  t.is(result, text);
});

test('markdownToText maintains only one trailing new line', t => {
  const text = `This is a test.


`;

  const result = TextProcessor.markdownToText(text);

  t.is(result, 'This is a test.\n');
});

test('markdownToText removes markdown formatting', t => {
  const text = '_This_ **is** `a` test.\n';

  const result = TextProcessor.markdownToText(text);

  t.is(result, 'This is a test.\n');
});

test('markdownToText removes YAML front matter', t => {
  const text = `---
title: "Test Title"
---

This is a test.
`;

  const result = TextProcessor.markdownToText(text);

  t.is(result, 'This is a test.\n');
});

test('markdownToText handles blank links', t => {
  const text = `---
title: "Test Title"
---

[]()
[]()
`;

  const result = TextProcessor.markdownToText(text);

  t.is(result, '');
});
