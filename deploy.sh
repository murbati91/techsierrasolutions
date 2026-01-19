#!/bin/bash
# TechSierra Solutions Deployment Script
# Usage: ./deploy.sh [option]
# Options:
#   (no args)  - Full deploy: git push + sync to server
#   push       - Git push only
#   sync       - SCP sync only (no git)
#   pull       - Git pull on server only
#   build      - Build projects.json from individual project files
#   build-push - Build projects.json, then full deploy

set -e

SERVER="root@104.248.23.145"
REMOTE_PATH="/opt/tech-sierra-portfolio"

echo "=========================================="
echo "  TechSierra Solutions Deployment"
echo "=========================================="

# Function: Build projects.json from individual JSON files
build_projects() {
    echo "[BUILD] Building projects.json from individual files..."
    if command -v node &> /dev/null; then
        node build-projects.js
        echo "Build complete!"
    else
        echo "ERROR: Node.js is required to build projects.json"
        echo "Install Node.js or manually edit projects.json"
        exit 1
    fi
}

# Function: Git push to GitHub
git_push() {
    echo "[1/2] Pushing to GitHub..."
    git add -A
    git commit -m "Update site content" 2>/dev/null || echo "Nothing to commit"
    git push origin master
    echo "GitHub push complete!"
}

# Function: Sync files to server using SCP
sync_to_server() {
    echo "[2/2] Syncing to server..."
    # Upload key files - add more as needed
    scp -r index.html projects.html projects.json sw.js manifest.json \
        assets/ projects/ videos/ \
        tss-*.png tss-*.svg favicon.* icon-*.png apple-touch-*.png \
        "$SERVER:$REMOTE_PATH/"
    echo "Server sync complete!"
}

# Function: Git pull on server (cleanest method)
git_pull_server() {
    echo "Pulling latest from GitHub on server..."
    ssh $SERVER "cd $REMOTE_PATH && git pull origin master"
    echo "Server pull complete!"
}

# Main logic
case "${1:-full}" in
    build)
        build_projects
        ;;
    build-push)
        build_projects
        git_push
        git_pull_server
        ;;
    push)
        git_push
        ;;
    sync)
        sync_to_server
        ;;
    pull)
        git_pull_server
        ;;
    full|*)
        git_push
        git_pull_server
        ;;
esac

echo ""
echo "=========================================="
echo "  Deployment Complete!"
echo "  Visit: https://techsierrasolutions.com"
echo "=========================================="
