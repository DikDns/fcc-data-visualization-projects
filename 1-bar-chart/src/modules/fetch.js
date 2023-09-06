function getFetch(url) {
  return fetch(url).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((json) => Promise.reject(json));
  });
}

export { getFetch };
