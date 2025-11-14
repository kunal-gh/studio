# Design Document

## Overview

This design document outlines the deployment architecture and process for deploying the "Through Hardik's Eye" Next.js photography portfolio to Firebase App Hosting. The deployment follows a sequential pipeline approach with validation, building, and deployment phases.

## Architecture

### Deployment Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                     Deployment Pipeline                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 1: Environment Validation                                 │
│  - Check Node.js version (>= 18)                                │
│  - Check npm availability                                        │
│  - Install Firebase CLI if missing                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 2: Dependency Installation                               │
│  - Run npm install                                              │
│  - Verify node_modules created                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 3: Firebase Initialization                               │
│  - Authenticate with Firebase                                   │
│  - Select project: studio-6358494429-d141f                     │
│  - Configure App Hosting                                        │
│  - Deploy Firestore rules                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 4: Production Build                                      │
│  - Compile TypeScript to JavaScript                             │
│  - Optimize React components                                    │
│  - Generate static pages                                        │
│  - Bundle client-side code                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 5: Firebase Deployment                                   │
│  - Upload build artifacts                                       │
│  - Configure hosting rules                                      │
│  - Deploy to production                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 6: Verification                                          │
│  - Test live URL                                                │
│  - Verify Firestore connectivity                               │
│  - Check page rendering                                         │
└─────────────────────────────────────────────────────────────────┘
```

### System Components

#### Local Development Environment
- **Node.js Runtime**: Executes JavaScript and builds the application
- **npm Package Manager**: Manages project dependencies
- **Firebase CLI**: Interfaces with Firebase services for deployment

#### Next.js Application
- **App Router**: Handles client-side and server-side routing
- **React Components**: UI components using shadcn/ui library
- **Firebase SDK**: Client-side integration with Firestore
- **Tailwind CSS**: Styling framework for responsive design

#### Firebase Infrastructure
- **App Hosting**: Managed hosting service for Next.js applications
- **Firestore Database**: NoSQL database for photographs and testimonials
- **CDN**: Content delivery network for static assets
- **SSL/TLS**: Automatic HTTPS certificate management

## Components and Interfaces

### 1. Environment Validator

**Purpose**: Validates that all required tools are installed and properly configured.

**Interface**:
```typescript
interface EnvironmentValidator {
  checkNodeVersion(): Promise<{ version: string; valid: boolean }>;
  checkNpmAvailable(): Promise<boolean>;
  checkFirebaseCLI(): Promise<{ installed: boolean; version?: string }>;
  installFirebaseCLI(): Promise<void>;
}
```

**Behavior**:
- Executes shell commands to check tool versions
- Compares versions against minimum requirements
- Installs missing tools automatically
- Reports validation results to console

### 2. Dependency Manager

**Purpose**: Installs all npm packages required by the application.

**Interface**:
```typescript
interface DependencyManager {
  installDependencies(): Promise<void>;
  verifyInstallation(): Promise<boolean>;
  getDependencyList(): string[];
}
```

**Behavior**:
- Reads package.json for dependency list
- Executes npm install command
- Monitors installation progress
- Verifies node_modules directory creation

### 3. Firebase Configurator

**Purpose**: Initializes Firebase project configuration and authentication.

**Interface**:
```typescript
interface FirebaseConfigurator {
  authenticate(): Promise<void>;
  selectProject(projectId: string): Promise<void>;
  initializeHosting(): Promise<void>;
  deployFirestoreRules(rulesPath: string): Promise<void>;
  createConfigFiles(): Promise<void>;
}
```

**Configuration Files**:

**firebase.json**:
```json
{
  "hosting": {
    "source": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "frameworksBackend": {
      "region": "us-central1"
    }
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

**.firebaserc**:
```json
{
  "projects": {
    "default": "studio-6358494429-d141f"
  }
}
```

### 4. Build Manager

**Purpose**: Compiles and optimizes the Next.js application for production.

**Interface**:
```typescript
interface BuildManager {
  runBuild(): Promise<void>;
  verifyBuildArtifacts(): Promise<boolean>;
  getBuildStats(): BuildStats;
}

interface BuildStats {
  duration: number;
  pageCount: number;
  staticPages: string[];
  serverPages: string[];
  errors: string[];
}
```

**Build Process**:
1. TypeScript compilation
2. React component optimization
3. CSS processing with Tailwind
4. Image optimization configuration
5. Static page generation
6. Server function bundling

### 5. Deployment Manager

**Purpose**: Uploads build artifacts to Firebase App Hosting.

**Interface**:
```typescript
interface DeploymentManager {
  deploy(): Promise<DeploymentResult>;
  monitorProgress(): AsyncIterator<DeploymentProgress>;
  rollback(version: string): Promise<void>;
}

interface DeploymentResult {
  success: boolean;
  url: string;
  version: string;
  deploymentTime: number;
}

interface DeploymentProgress {
  phase: string;
  percentage: number;
  message: string;
}
```

**Deployment Steps**:
1. Package build artifacts
2. Upload to Firebase storage
3. Configure hosting rules
4. Deploy to production environment
5. Update DNS routing
6. Invalidate CDN cache

### 6. Verification Service

**Purpose**: Validates that the deployed application is functioning correctly.

**Interface**:
```typescript
interface VerificationService {
  testHomepage(): Promise<boolean>;
  testFirestoreConnection(): Promise<boolean>;
  testPortfolioPages(): Promise<boolean>;
  testContactForm(): Promise<boolean>;
  generateReport(): VerificationReport;
}

interface VerificationReport {
  allTestsPassed: boolean;
  tests: TestResult[];
  url: string;
}

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}
```

## Data Models

### Firebase Configuration

```typescript
interface FirebaseConfig {
  projectId: string;
  appId: string;
  apiKey: string;
  authDomain: string;
  measurementId: string;
  messagingSenderId: string;
}
```

### Deployment Configuration

```typescript
interface AppHostingConfig {
  runConfig: {
    maxInstances: number;
    minInstances?: number;
    cpu?: number;
    memory?: string;
    concurrency?: number;
  };
  env?: Record<string, string>;
}
```

### Build Configuration

```typescript
interface NextConfig {
  typescript: {
    ignoreBuildErrors: boolean;
  };
  eslint: {
    ignoreDuringBuilds: boolean;
  };
  images: {
    remotePatterns: RemotePattern[];
  };
}

interface RemotePattern {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
}
```

## Error Handling

### Error Categories

1. **Environment Errors**
   - Missing Node.js installation
   - Incompatible Node.js version
   - Missing npm or Firebase CLI
   - **Recovery**: Install or update required tools

2. **Dependency Errors**
   - Network timeout during npm install
   - Package version conflicts
   - Corrupted node_modules
   - **Recovery**: Clear cache, retry installation

3. **Authentication Errors**
   - Firebase login failure
   - Invalid credentials
   - Expired session
   - **Recovery**: Re-authenticate with firebase login

4. **Build Errors**
   - TypeScript compilation errors
   - Missing imports
   - Syntax errors
   - **Recovery**: Fix code issues, retry build

5. **Deployment Errors**
   - Network connectivity issues
   - Insufficient permissions
   - Quota exceeded
   - **Recovery**: Check network, verify permissions, upgrade plan

6. **Runtime Errors**
   - Firestore connection failures
   - Missing environment variables
   - API rate limiting
   - **Recovery**: Check Firebase console, verify configuration

### Error Handling Strategy

```typescript
interface ErrorHandler {
  handleError(error: DeploymentError): Promise<void>;
  retry(operation: () => Promise<void>, maxRetries: number): Promise<void>;
  logError(error: Error, context: string): void;
}

class DeploymentError extends Error {
  constructor(
    message: string,
    public phase: string,
    public recoverable: boolean,
    public suggestion: string
  ) {
    super(message);
  }
}
```

## Testing Strategy

### Pre-Deployment Testing

1. **Local Build Test**
   - Run `npm run build` locally
   - Verify no compilation errors
   - Check build output size

2. **Local Server Test**
   - Run `npm run start` after build
   - Test all routes manually
   - Verify Firestore connectivity

### Post-Deployment Testing

1. **Smoke Tests**
   - Homepage loads successfully
   - All portfolio categories accessible
   - Contact form renders correctly
   - Testimonials carousel functions

2. **Integration Tests**
   - Firestore data fetching works
   - Image loading from external sources
   - Form submission (if backend configured)
   - Navigation between pages

3. **Performance Tests**
   - Page load time < 3 seconds
   - Lighthouse score > 90
   - Core Web Vitals pass
   - Mobile responsiveness

### Monitoring

- Firebase Console for hosting metrics
- Error reporting in Firebase Crashlytics
- Performance monitoring in Firebase Performance
- Analytics in Firebase Analytics

## Security Considerations

1. **API Key Protection**
   - Firebase config uses restricted API keys
   - Keys are safe for client-side use
   - Firestore rules enforce data access control

2. **Firestore Security Rules**
   - Read access: Public for photographs and testimonials
   - Write access: Authenticated users only
   - Rules deployed with application

3. **HTTPS Enforcement**
   - Firebase App Hosting enforces HTTPS
   - Automatic SSL certificate provisioning
   - HTTP requests redirect to HTTPS

4. **Environment Variables**
   - Sensitive data not in source code
   - Firebase config in dedicated file
   - No secrets in client-side code

## Performance Optimization

1. **Build Optimization**
   - Next.js automatic code splitting
   - Tree shaking for unused code
   - Image optimization with Next/Image
   - CSS purging with Tailwind

2. **Hosting Optimization**
   - CDN distribution globally
   - Automatic caching headers
   - Compression (gzip/brotli)
   - HTTP/2 support

3. **Database Optimization**
   - Firestore indexes for queries
   - Pagination for large collections
   - Client-side caching
   - Optimistic UI updates

## Deployment Workflow

### Manual Deployment

```bash
# 1. Install dependencies
npm install

# 2. Build application
npm run build

# 3. Login to Firebase
firebase login

# 4. Deploy
firebase deploy
```

### Automated Deployment (CI/CD)

For future implementation:
- GitHub Actions workflow
- Automatic deployment on main branch push
- Preview deployments for pull requests
- Automated testing before deployment

## Rollback Strategy

If deployment issues occur:

1. **Immediate Rollback**
   ```bash
   firebase hosting:rollback
   ```

2. **Version Management**
   - Firebase keeps previous versions
   - Can rollback to any previous deployment
   - Zero downtime during rollback

3. **Database Rollback**
   - Firestore rules can be reverted
   - Data backups available in Firebase Console
   - Point-in-time recovery available

## Success Criteria

Deployment is successful when:
1. Build completes without errors
2. All files uploaded to Firebase
3. Live URL returns HTTP 200
4. Homepage renders correctly
5. Firestore data loads successfully
6. No console errors in browser
7. All portfolio pages accessible
8. Contact form displays properly
