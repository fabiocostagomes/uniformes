type CallbackCodeResult = {
  code: string | null;
  state: string | null;
};

export function readAuthCallbackParams(url: URL): CallbackCodeResult {
  return {
    code: url.searchParams.get('code'),
    state: url.searchParams.get('state'),
  };
}

