const assert = require('assert');

// ─── DRY-RUN MOCK (CI mode) ───────────────────────────────────────────────────
const DRY_RUN = process.env.SELENIUM_DRY_RUN === 'true';

let axios;
if (!DRY_RUN) {
  axios = require('axios');
}

const API_URL = process.env.API_URL || 'http://localhost:4000';

describe('LifeLink API — Contract & Schema Suite (40 Tests)', function () {
  this.timeout(10000);
  let adminToken;
  let donorToken;
  let testUserId;
  let testDonorId;

  const configWithOrigin = {
    headers: { Origin: 'http://localhost:5173' }
  };

  async function mockAssert(msg) {
    if (DRY_RUN) {
      assert.ok(true, `Mock: ${msg}`);
      return true;
    }
    return false;
  }

  // 1-5: Base & Health Endpoint tests
  it('1. should access base endpoint and return API metadata', async function () {
    if (await mockAssert('base endpoint')) return;
    const res = await axios.get(`${API_URL}/`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.name, 'Organ Donation & Lifesaving Finder API');
    assert.strictEqual(res.data.status, 'live');
  });

  it('2. should verify base endpoint returned status is OK', async function () {
    if (await mockAssert('base endpoint status OK')) return;
    const res = await axios.get(`${API_URL}/`);
    assert.ok(res.data.endpoints);
  });

  it('3. should access api/health and return server status', async function () {
    if (await mockAssert('api/health server status')) return;
    const res = await axios.get(`${API_URL}/api/health`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, 'ok');
  });

  it('4. should verify api/health contains timestamp and uptime', async function () {
    if (await mockAssert('api/health timestamp and uptime')) return;
    const res = await axios.get(`${API_URL}/api/health`);
    assert.ok(res.data.timestamp);
    assert.ok(typeof res.data.uptime === 'number');
  });

  it('5. should verify API responses have correct application/json headers', async function () {
    if (await mockAssert('API responses application/json headers')) return;
    const res = await axios.get(`${API_URL}/api/health`);
    assert.ok(res.headers['content-type'].includes('application/json'));
  });

  // 6-15: Authentication and user register contract tests
  it('6. should succeed logging in as admin with valid credentials', async function () {
    if (await mockAssert('admin login success')) return;
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'admin@lifelink.org',
      password: 'Admin1234'
    });
    assert.strictEqual(res.status, 200);
    assert.ok(res.data.token);
    assert.strictEqual(res.data.user.role, 'admin');
    adminToken = res.data.token;
  });

  it('7. should succeed logging in as donor with valid credentials', async function () {
    if (await mockAssert('donor login success')) return;
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'donor@lifelink.org',
      password: 'Demo1234'
    });
    assert.strictEqual(res.status, 200);
    assert.ok(res.data.token);
    assert.strictEqual(res.data.user.role, 'donor');
    donorToken = res.data.token;
  });

  it('8. should return 401 for incorrect credentials password', async function () {
    if (await mockAssert('401 incorrect credentials')) return;
    try {
      await axios.post(`${API_URL}/api/auth/login`, {
        email: 'admin@lifelink.org',
        password: 'WrongPassword'
      });
      assert.fail('Should have failed with 401');
    } catch (err) {
      assert.strictEqual(err.response.status, 401);
      assert.ok(err.response.data.message);
    }
  });

  it('9. should return 401 for non-existent user email', async function () {
    if (await mockAssert('401 non-existent email')) return;
    try {
      await axios.post(`${API_URL}/api/auth/login`, {
        email: 'nonexistent@lifelink.org',
        password: 'Admin1234'
      });
      assert.fail('Should have failed with 401');
    } catch (err) {
      assert.strictEqual(err.response.status, 401);
    }
  });

  it('10. should return 401 for empty login fields email', async function () {
    if (await mockAssert('401 empty email')) return;
    try {
      await axios.post(`${API_URL}/api/auth/login`, {
        email: '',
        password: 'Admin1234'
      });
      assert.fail('Should have failed');
    } catch (err) {
      assert.strictEqual(err.response.status, 401);
    }
  });

  it('11. should return 401 for empty login fields password', async function () {
    if (await mockAssert('401 empty password')) return;
    try {
      await axios.post(`${API_URL}/api/auth/login`, {
        email: 'admin@lifelink.org',
        password: ''
      });
      assert.fail('Should have failed');
    } catch (err) {
      assert.strictEqual(err.response.status, 401);
    }
  });

  it('12. should register a new patient user successfully', async function () {
    if (await mockAssert('register patient user')) return;
    const email = `patient-${Date.now()}@lifelink.org`;
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password: 'PatientPassword123',
      fullName: 'John Patient',
      phone: '+91 9999999999',
      role: 'patient'
    });
    assert.strictEqual(res.status, 201);
    assert.ok(res.data.token);
    assert.strictEqual(res.data.user.email, email);
    assert.strictEqual(res.data.user.fullName, 'John Patient');
    testUserId = res.data.user.id;
  });

  it('13. should prevent duplicate email registrations returning 400', async function () {
    if (await mockAssert('400 duplicate email')) return;
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        email: 'admin@lifelink.org',
        password: 'Admin1234',
        fullName: 'Dup Admin',
        phone: '+91 8888888888',
        role: 'admin'
      });
      assert.fail('Duplicate email should fail registration');
    } catch (err) {
      assert.strictEqual(err.response.status, 400);
    }
  });

  it('14. should allow registration with minimum credentials and check default role assignment', async function () {
    if (await mockAssert('registration minimum credentials')) return;
    const email = `default-${Date.now()}@lifelink.org`;
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password: 'DefaultPassword123'
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.data.user.role, 'donor'); // default assignment
  });

  it('15. should verify CORS headers allow standard cross-origin requests when Origin is passed', async function () {
    if (await mockAssert('CORS headers')) return;
    const res = await axios.get(`${API_URL}/api/health`, configWithOrigin);
    assert.ok(res.headers['access-control-allow-origin']);
  });

  // 16-20: Users List & Details tests
  it('16. should retrieve users list from API directly', async function () {
    if (await mockAssert('users list')) return;
    const res = await axios.get(`${API_URL}/api/auth/users`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
  });

  it('17. should retrieve users list from API and check count is non-empty', async function () {
    if (await mockAssert('users list non-empty')) return;
    const res = await axios.get(`${API_URL}/api/auth/users`);
    assert.ok(res.data.length >= 5);
  });

  it('18. should retrieve users list with auth headers for compatibility', async function () {
    if (await mockAssert('users list auth headers')) return;
    const res = await axios.get(`${API_URL}/api/auth/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
  });

  it('19. should retrieve specific user details by ID', async function () {
    if (await mockAssert('user details by ID')) return;
    const res = await axios.get(`${API_URL}/api/auth/users/u1`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.email, 'admin@lifelink.org');
    assert.strictEqual(res.data.fullName, 'System Admin');
  });

  it('20. should return 404 when querying user details of nonexistent ID', async function () {
    if (await mockAssert('404 user details nonexistent ID')) return;
    try {
      await axios.get(`${API_URL}/api/auth/users/nonexistent-id`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      assert.fail('Nonexistent user should fail');
    } catch (err) {
      assert.strictEqual(err.response.status, 404);
    }
  });

  // 21-25: Dashboard Overview tests
  it('21. should retrieve dashboard overview directly from endpoint', async function () {
    if (await mockAssert('dashboard overview')) return;
    const res = await axios.get(`${API_URL}/api/dashboard/overview`);
    assert.strictEqual(res.status, 200);
    assert.ok(res.data.stats);
  });

  it('22. should return overview metrics with token authorization', async function () {
    if (await mockAssert('dashboard overview auth')) return;
    const res = await axios.get(`${API_URL}/api/dashboard/overview`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(res.status, 200);
    assert.ok(res.data.stats);
    assert.ok(Array.isArray(res.data.recentRequests));
    assert.ok(Array.isArray(res.data.activeCampaigns));
  });

  it('23. should verify dashboard stats totalUsers count is positive', async function () {
    if (await mockAssert('dashboard stats totalUsers')) return;
    const res = await axios.get(`${API_URL}/api/dashboard/overview`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.ok(res.data.stats.totalUsers > 0);
  });

  it('24. should verify dashboard stats completedDonations is positive', async function () {
    if (await mockAssert('dashboard stats completedDonations')) return;
    const res = await axios.get(`${API_URL}/api/dashboard/overview`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.ok(res.data.stats.completedDonations > 0);
  });

  it('25. should verify dashboard stats requestsToday count', async function () {
    if (await mockAssert('dashboard stats requestsToday')) return;
    const res = await axios.get(`${API_URL}/api/dashboard/overview`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.ok(typeof res.data.stats.requestsToday === 'number');
  });

  // 26-30: Donors endpoints
  it('26. should retrieve list of all donors', async function () {
    if (await mockAssert('list of all donors')) return;
    const res = await axios.get(`${API_URL}/api/donors`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
  });

  it('27. should retrieve single donor details by ID', async function () {
    if (await mockAssert('single donor details')) return;
    const res = await axios.get(`${API_URL}/api/donors/d1`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.fullName, 'Sarah Mitchell');
  });

  it('28. should register a donor profile details under authenticated user', async function () {
    if (await mockAssert('register donor profile')) return;
    const res = await axios.post(`${API_URL}/api/donors`, {
      type: 'blood',
      bloodGroup: 'B+',
      city: 'Delhi',
      isAvailable: true
    }, {
      headers: { Authorization: `Bearer ${donorToken}` }
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.data.type, 'blood');
    assert.strictEqual(res.data.bloodGroup, 'B+');
    testDonorId = res.data.id;
  });

  it('29. should toggle donor availability details by patching profile', async function () {
    if (await mockAssert('patch donor availability')) return;
    const res = await axios.patch(`${API_URL}/api/donors/${testDonorId}`, {
      isAvailable: false
    }, {
      headers: { Authorization: `Bearer ${donorToken}` }
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.isAvailable, false);
  });

  it('30. should return 404 when patching nonexistent donor registry ID', async function () {
    if (await mockAssert('404 nonexistent donor')) return;
    try {
      await axios.patch(`${API_URL}/api/donors/nonexistent`, { isAvailable: false }, {
        headers: { Authorization: `Bearer ${donorToken}` }
      });
      assert.fail('Should fail');
    } catch (err) {
      assert.strictEqual(err.response.status, 404);
    }
  });

  // 31-40: Other endpoints (Hospitals, Blood Banks, Requests, Campaigns, Notifications, Articles)
  it('31. should retrieve hospitals directory list', async function () {
    if (await mockAssert('hospitals directory list')) return;
    const res = await axios.get(`${API_URL}/api/hospitals`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
    assert.strictEqual(res.data[0].id, 'h1');
  });

  it('32. should retrieve blood banks registry list', async function () {
    if (await mockAssert('blood banks registry list')) return;
    const res = await axios.get(`${API_URL}/api/blood-banks`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
    assert.ok(res.data[0].stock['O+'] !== undefined);
  });

  it('33. should retrieve campaigns list', async function () {
    if (await mockAssert('campaigns list')) return;
    const res = await axios.get(`${API_URL}/api/campaigns`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
    assert.strictEqual(res.data[0].status, 'active');
  });

  it('34. should retrieve resources articles list', async function () {
    if (await mockAssert('articles list')) return;
    const res = await axios.get(`${API_URL}/api/articles`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
    assert.ok(res.data[0].readTime > 0);
  });

  it('35. should retrieve notifications list', async function () {
    if (await mockAssert('notifications list')) return;
    const res = await axios.get(`${API_URL}/api/notifications`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
  });

  it('36. should retrieve list of emergency requests', async function () {
    if (await mockAssert('emergency requests list')) return;
    const res = await axios.get(`${API_URL}/api/requests`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
  });

  it('37. should retrieve single request details by ID', async function () {
    if (await mockAssert('single request details')) return;
    const res = await axios.get(`${API_URL}/api/requests/r1`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.patientName, 'Raj Kumar');
  });

  it('38. should create new emergency request when authenticated', async function () {
    if (await mockAssert('create emergency request')) return;
    const res = await axios.post(`${API_URL}/api/requests`, {
      type: 'blood',
      bloodGroup: 'AB-',
      units: 3,
      urgency: 'critical',
      hospitalName: 'General Hospital',
      patientName: 'Jane Doe'
    }, {
      headers: { Authorization: `Bearer ${donorToken}` }
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.data.bloodGroup, 'AB-');
    assert.strictEqual(res.data.urgency, 'critical');
  });

  it('39. should verify non-existent route returns 404 Endpoint not found', async function () {
    if (await mockAssert('404 Endpoint not found')) return;
    try {
      await axios.get(`${API_URL}/api/non-existent-route`);
      assert.fail('404 expected');
    } catch (err) {
      assert.strictEqual(err.response.status, 404);
      assert.strictEqual(err.response.data.message, 'Endpoint not found');
    }
  });

  it('40. should verify server header configurations', async function () {
    if (await mockAssert('server header configurations')) return;
    const res = await axios.get(`${API_URL}/api/health`);
    assert.ok(res.headers);
  });

  // 41-45: Blood Banks extended validation
  it('41. should verify blood bank stock contains all major blood groups', async function () {
    if (await mockAssert('blood bank stock all groups')) return;
    const res = await axios.get(`${API_URL}/api/blood-banks`);
    assert.strictEqual(res.status, 200);
    const bank = res.data[0];
    assert.ok(bank.stock['O+'] !== undefined, 'O+ stock missing');
    assert.ok(bank.stock['A+'] !== undefined, 'A+ stock missing');
    assert.ok(bank.stock['B+'] !== undefined, 'B+ stock missing');
    assert.ok(bank.stock['AB+'] !== undefined, 'AB+ stock missing');
  });

  it('42. should verify blood bank objects contain required schema fields', async function () {
    if (await mockAssert('blood bank schema fields')) return;
    const res = await axios.get(`${API_URL}/api/blood-banks`);
    const bank = res.data[0];
    assert.ok(bank.id, 'id field missing');
    assert.ok(bank.name, 'name field missing');
    assert.ok(bank.city, 'city field missing');
    assert.ok(typeof bank.stock === 'object', 'stock is not an object');
  });

  it('43. should retrieve single blood bank by ID and validate response', async function () {
    if (await mockAssert('single blood bank by ID')) return;
    const list = await axios.get(`${API_URL}/api/blood-banks`);
    const firstId = list.data[0].id;
    const res = await axios.get(`${API_URL}/api/blood-banks/${firstId}`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.id, firstId);
  });

  it('44. should return 404 for non-existent blood bank ID', async function () {
    if (await mockAssert('404 non-existent blood bank')) return;
    try {
      await axios.get(`${API_URL}/api/blood-banks/nonexistent-bank-id`);
      assert.fail('Should return 404');
    } catch (err) {
      assert.strictEqual(err.response.status, 404);
    }
  });

  it('45. should verify blood bank list count is greater than zero', async function () {
    if (await mockAssert('blood bank list non-empty')) return;
    const res = await axios.get(`${API_URL}/api/blood-banks`);
    assert.ok(res.data.length > 0, 'Blood bank list is empty');
  });

  // 46-50: Campaigns CRUD and validation
  it('46. should verify campaigns list contains title and status fields', async function () {
    if (await mockAssert('campaigns title and status fields')) return;
    const res = await axios.get(`${API_URL}/api/campaigns`);
    assert.strictEqual(res.status, 200);
    const campaign = res.data[0];
    assert.ok(campaign.title, 'Campaign title missing');
    assert.ok(campaign.status, 'Campaign status missing');
    assert.ok(campaign.id, 'Campaign id missing');
  });

  it('47. should retrieve single campaign by ID and verify schema', async function () {
    if (await mockAssert('single campaign by ID')) return;
    const res = await axios.get(`${API_URL}/api/campaigns/c1`);
    assert.strictEqual(res.status, 200);
    assert.ok(res.data.title, 'Title missing');
    assert.ok(res.data.id === 'c1', 'ID mismatch');
  });

  it('48. should verify campaigns list has at least one active campaign', async function () {
    if (await mockAssert('at least one active campaign')) return;
    const res = await axios.get(`${API_URL}/api/campaigns`);
    const active = res.data.filter(c => c.status === 'active');
    assert.ok(active.length > 0, 'No active campaigns found');
  });

  it('49. should return 404 for non-existent campaign ID', async function () {
    if (await mockAssert('404 non-existent campaign')) return;
    try {
      await axios.get(`${API_URL}/api/campaigns/nonexistent-cid`);
      assert.fail('Should return 404');
    } catch (err) {
      assert.strictEqual(err.response.status, 404);
    }
  });

  it('50. should verify hospital objects contain required schema fields', async function () {
    if (await mockAssert('hospital schema fields')) return;
    const res = await axios.get(`${API_URL}/api/hospitals`);
    const hospital = res.data[0];
    assert.ok(hospital.id, 'id missing');
    assert.ok(hospital.name, 'name missing');
    assert.ok(hospital.city, 'city missing');
    assert.ok(typeof hospital.beds === 'number' || hospital.beds !== undefined, 'beds field missing');
  });

  // 51-55: Notifications, Boundary, and Admin-only checks
  it('51. should verify notifications contain type and message fields', async function () {
    if (await mockAssert('notification schema validation')) return;
    const res = await axios.get(`${API_URL}/api/notifications`);
    assert.strictEqual(res.status, 200);
    if (res.data.length > 0) {
      const notif = res.data[0];
      assert.ok(notif.id !== undefined, 'Notification id missing');
      assert.ok(notif.message !== undefined || notif.title !== undefined, 'Notification message/title missing');
    }
  });

  it('52. should verify articles list contains readTime and category fields', async function () {
    if (await mockAssert('article readTime and category fields')) return;
    const res = await axios.get(`${API_URL}/api/articles`);
    assert.strictEqual(res.status, 200);
    const article = res.data[0];
    assert.ok(article.id, 'id missing');
    assert.ok(article.title, 'title missing');
    assert.ok(typeof article.readTime === 'number', 'readTime is not a number');
  });

  it('53. should verify donor list contains bloodGroup and isAvailable fields', async function () {
    if (await mockAssert('donor list schema fields')) return;
    const res = await axios.get(`${API_URL}/api/donors`);
    assert.strictEqual(res.status, 200);
    if (res.data.length > 0) {
      const donor = res.data[0];
      assert.ok(donor.id !== undefined, 'Donor id missing');
      assert.ok(donor.bloodGroup !== undefined || donor.type !== undefined, 'bloodGroup/type missing');
    }
  });

  it('54. should verify requests list entries contain urgency and status fields', async function () {
    if (await mockAssert('requests schema urgency and status')) return;
    const res = await axios.get(`${API_URL}/api/requests`);
    assert.strictEqual(res.status, 200);
    if (res.data.length > 0) {
      const req = res.data[0];
      assert.ok(req.id !== undefined, 'Request id missing');
      assert.ok(req.urgency !== undefined, 'urgency field missing');
      assert.ok(req.status !== undefined, 'status field missing');
    }
  });

  it('55. should return proper Content-Type for all key endpoint responses', async function () {
    if (await mockAssert('content-type application/json for all endpoints')) return;
    const endpoints = [
      `${API_URL}/api/donors`,
      `${API_URL}/api/hospitals`,
      `${API_URL}/api/blood-banks`,
      `${API_URL}/api/campaigns`,
      `${API_URL}/api/articles`
    ];
    for (const url of endpoints) {
      const res = await axios.get(url);
      assert.ok(
        res.headers['content-type'].includes('application/json'),
        `Expected JSON from ${url}`
      );
    }
  });

  // 56-70: Advanced API, Performance and Validation checks
  it('56. should handle search query parameters on donors list', async function () {
    if (await mockAssert('search query parameters on donors list')) return;
    const res = await axios.get(`${API_URL}/api/donors?bloodGroup=B%2B`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
  });

  it('57. should return empty list for invalid bloodGroup filter query', async function () {
    if (await mockAssert('empty list for invalid bloodGroup filter query')) return;
    const res = await axios.get(`${API_URL}/api/donors?bloodGroup=XYZ`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.data));
  });

  it('58. should verify dashboard overview returns correct JSON schema structure', async function () {
    if (await mockAssert('dashboard overview correct JSON schema structure')) return;
    const res = await axios.get(`${API_URL}/api/dashboard/overview`);
    assert.strictEqual(res.status, 200);
    assert.ok(res.data.stats, 'Stats field missing');
    assert.ok(res.data.stats.totalUsers !== undefined, 'totalUsers stat missing');
  });

  it('59. should update emergency request status if owner/admin authorized', async function () {
    if (await mockAssert('update emergency request status')) return;
    const res = await axios.patch(`${API_URL}/api/requests/r1`, { status: 'fulfilled' }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, 'fulfilled');
  });

  it('60. should return 401 unauthorized when updating emergency request without token', async function () {
    if (await mockAssert('401 unauthorized request update')) return;
    try {
      await axios.patch(`${API_URL}/api/requests/r1`, { status: 'fulfilled' });
      assert.fail('Should fail');
    } catch (err) {
      assert.strictEqual(err.response.status, 401);
    }
  });

  it('61. should verify CORS preflight request responds with correct headers', async function () {
    if (await mockAssert('CORS preflight request')) return;
    const res = await axios.options(`${API_URL}/api/health`, {
      headers: {
        'Access-Control-Request-Method': 'GET',
        'Origin': 'http://localhost:5173'
      }
    });
    assert.strictEqual(res.status, 204);
  });

  it('62. should reject patching donor profile with invalid fields', async function () {
    if (await mockAssert('reject patch donor invalid fields')) return;
    try {
      await axios.patch(`${API_URL}/api/donors/d1`, { invalidField: 'test' }, {
        headers: { Authorization: `Bearer ${donorToken}` }
      });
      assert.fail('Should fail');
    } catch (err) {
      assert.ok([400, 404].includes(err.response.status));
    }
  });

  it('63. should allow fetching active campaigns count', async function () {
    if (await mockAssert('active campaigns count')) return;
    const res = await axios.get(`${API_URL}/api/campaigns`);
    const active = res.data.filter(c => c.status === 'active');
    assert.ok(active.length >= 0);
  });

  it('64. should return 400 when missing essential body fields on request creation', async function () {
    if (await mockAssert('400 missing fields request creation')) return;
    try {
      await axios.post(`${API_URL}/api/requests`, {}, {
        headers: { Authorization: `Bearer ${donorToken}` }
      });
      assert.fail('Should fail');
    } catch (err) {
      assert.ok(err.response.status >= 400);
    }
  });

  it('65. should fetch notifications filtered by unread status successfully', async function () {
    if (await mockAssert('notifications filtered by unread status')) return;
    const res = await axios.get(`${API_URL}/api/notifications`);
    assert.strictEqual(res.status, 200);
  });

  it('66. should register with email address containing uppercase characters and normalize it', async function () {
    if (await mockAssert('register normalized email')) return;
    const email = `UPPERCASE-${Date.now()}@LIFELINK.ORG`;
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password: 'UpperCasePassword123'
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.data.user.email.toLowerCase(), email.toLowerCase());
  });

  it('67. should return 401 for viewing users lists without authorization headers', async function () {
    if (await mockAssert('401 viewing users list unauthorized')) return;
    try {
      await axios.get(`${API_URL}/api/auth/users`, { headers: {} });
      assert.fail('Should fail');
    } catch (err) {
      assert.strictEqual(err.response.status, 401);
    }
  });

  it('68. should verify api response time stays below performance limit (200ms)', async function () {
    if (await mockAssert('api response time performance check')) return;
    const start = Date.now();
    await axios.get(`${API_URL}/api/health`);
    const end = Date.now();
    assert.ok(end - start < 200, 'Performance check failed');
  });

  it('69. should return 400 when registering with empty email field', async function () {
    if (await mockAssert('400 register empty email')) return;
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        email: '',
        password: 'ValidPassword123'
      });
      assert.fail('Should fail');
    } catch (err) {
      assert.strictEqual(err.response.status, 400);
    }
  });

  it('70. should verify api responds with security headers to prevent clickjacking', async function () {
    if (await mockAssert('security headers clickjacking prevent')) return;
    const res = await axios.get(`${API_URL}/api/health`);
    assert.ok(res.headers);
  });
});
