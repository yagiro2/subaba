Subaba is a simple client for fetching subtitles from the OpenSubtitles API.

# Deploy to GCP Cloud Run
1. Run `npm run build` in the root folder (not the react-app folder!)  
1.1. This will build the react-app locally, creating the 'react-app/build' folder (TODO: maybe unnecessary? because GCP build process also does that.)  
1.2. This will run `gcloud run deploy` which will be an interactive shell script (since the arguments are not defined)  
2. Choose the current source code (just hit `enter`)
3. Service name: `subaba-service`
4. Region: `[15] europe-west1`