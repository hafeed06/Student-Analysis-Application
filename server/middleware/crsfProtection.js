const csrfProtection = csrf({
    cookie: true
  });

  app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });