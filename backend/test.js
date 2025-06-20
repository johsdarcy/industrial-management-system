import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

async function testEndpoints() {
  console.log('🧪 Tests automatiques des endpoints Swagger');
  console.log('============================================');
  
  const tests = [
    {
      name: 'API principale',
      url: `${BASE_URL}/api`,
      expected: 200
    },
    {
      name: 'Swagger JSON',
      url: `${BASE_URL}/api/docs/swagger.json`,
      expected: 200,
      contentType: 'application/json'
    },
    {
      name: 'Swagger UI',
      url: `${BASE_URL}/api/docs/`,
      expected: 200,
      contentType: 'text/html'
    },
    {
      name: 'Auth Login',
      url: `${BASE_URL}/api/auth/login`,
      method: 'POST',
      data: {
        email: 'test@dianalyse-signal.com',
        motDePasse: 'test123'
      },
      expected: 200
    }
  ];
  
  for (const test of tests) {
    try {
      const config = {
        method: test.method || 'GET',
        url: test.url,
        timeout: 5000,
        validateStatus: () => true
      };
      
      if (test.data) {
        config.data = test.data;
        config.headers = { 'Content-Type': 'application/json' };
      }
      
      const response = await axios(config);
      
      const status = response.status === test.expected ? '✅' : '❌';
      console.log(`${status} ${test.name}: ${response.status} (attendu: ${test.expected})`);
      
      if (test.contentType) {
        const contentType = response.headers['content-type'];
        const typeOk = contentType && contentType.includes(test.contentType) ? '✅' : '❌';
        console.log(`   ${typeOk} Content-Type: ${contentType}`);
      }
      
      if (test.name === 'Swagger JSON' && response.status === 200) {
        const data = response.data;
        if (data.openapi && data.info && data.paths) {
          console.log('   ✅ Structure JSON Swagger valide');
          console.log(`   📊 Nombre de routes: ${Object.keys(data.paths).length}`);
        } else {
          console.log('   ❌ Structure JSON Swagger invalide');
        }
      }
      
    } catch (error) {
      console.log(`❌ ${test.name}: ERREUR - ${error.message}`);
    }
  }
  
  console.log('\n🎯 Tests terminés');
  console.log('================');
  console.log('🌍 URLs à tester dans le navigateur:');
  console.log(`   • http://148.113.207.144:3001/api/docs`);
  console.log(`   • http://148.113.207.144:3001/api/docs/swagger.json`);
}

testEndpoints();
