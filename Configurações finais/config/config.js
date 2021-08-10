const env = process.env.NODE_ENV || 'dev';

const config = () => {
  switch (env){
    case 'dev':
      return {
        bd_string: 'mongodb+srv://user-admin:1234@clusternodejsbasiccours.gioks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        jwt_pass: '12345678',
        jwt_expires_in: '7d'
      }
    case 'hml':
      return {
        bd_string: 'mongodb+srv://user-admin:1234@clusternodejsbasiccours.gioks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        jwt_pass: '12345678',
        jwt_expires_in: '7d'
      }
    case 'prod':
      return {
        bd_string: 'mongodb+srv://user-admin:1234@clusternodejsbasiccours.gioks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        jwt_pass: 'jsafhsuh#hroi3ht8goi839r',
        jwt_expires_in: '7d'
      }
    }
}

module.exports = config();