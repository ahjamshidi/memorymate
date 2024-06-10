'use client';
import * as React from 'react';
import { CONFIG } from '../../constances/main';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import './register.css';
export default function Register() {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const SignUpButton = styled(Button)({
    textTransform: 'none',
    width: '100%',
  });
  return (
    <div className="register-form-container">
      <h1>{CONFIG.appName}</h1>
      <Container maxWidth="sm">
        <Box component="form" sx={{ sm: 12 }} noValidate autoComplete="off">
          <h2>Create an account </h2>
          <p>Enter email and password to sign up</p>
          <div>
            <TextField
              id="outlined-basic"
              type="email"
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              value={email}
              error={emailError}
            />
            <TextField
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="standard"
              color="secondary"
              type="password"
              value={password}
              error={passwordError}
              fullWidth
              sx={{ mb: 3 }}
            />
          </div>
          <SignUpButton variant="contained">Sign up</SignUpButton>
          <small>Have an account? <Link >Login Here</Link></small>
        </Box>
      </Container>
    </div>
  );
}
