const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const source = readFileSync(__dirname + '/../src/views/layout/LayoutSearchbar.vue', 'utf8');
function fn(name) { return source.match(new RegExp(`(?:async )?function ${name}\\([^]*?\\n\\}`))[0]; }
test('search preserves special characters as a single query value', () => {
  let opened;
  runInNewContext(fn('searchSubmit') + '\nsearchSubmit()', {
    keyword: { value: 'a&b#c +中文' }, currentEngine: { value: { searchUrl: 'https://example.com/', searchParams: { wd: '{KEY}' } } },
    URLSearchParams, window: { open: url => { opened = url; } }, addHistory() {}
  });
  assert.equal(new URL(opened).searchParams.get('wd'), 'a&b#c +中文');
});
test('empty keyword clears suggestions without making a request', async () => {
  let requests = 0;
  const list = { value: ['old'] };
  await runInNewContext(fn('getServerSuggectList') + '\ngetServerSuggectList()', {
    keyword: { value: '' }, suggestList: list, currentEngine: { value: {} }, suggestRequestId: 0,
    api: { getSearchSuggestFromBaidu: async () => { requests++; return { s: [] }; } }
  });
  assert.equal(requests, 0);
  assert.equal(list.value.length, 0);
});
test('an older response cannot overwrite suggestions for the latest input', async () => {
  const pending = [];
  const list = { value: [] };
  const keyword = { value: 'old' };
  const context = { keyword, suggestList: list, currentEngine: { value: {} }, suggestRequestId: 0,
    api: { getSearchSuggestFromBaidu: () => new Promise(resolve => pending.push(resolve)) }
  };
  runInNewContext(fn('getServerSuggectList') + '\nthis.request = getServerSuggectList;', context);
  const first = context.request();
  keyword.value = 'new';
  const second = context.request();
  pending[1]({ s: ['latest'] }); await second;
  pending[0]({ s: ['stale'] }); await first;
  assert.deepEqual(list.value, ['latest']);
});
test('suggestion network failure clears results without rejecting', async () => {
  const list = { value: ['old'] };
  await runInNewContext(fn('getServerSuggectList') + '\ngetServerSuggectList()', {
    keyword: { value: 'test' }, suggestList: list, currentEngine: { value: {} }, suggestRequestId: 0,
    api: { getSearchSuggestFromBaidu: async () => { throw new Error('offline'); } }
  });
  assert.equal(list.value.length, 0);
});
