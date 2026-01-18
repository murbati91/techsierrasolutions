#!/bin/bash
# TechSierra Solutions Deployment Script
# Usage: ./deploy.sh

set -e

echo "Deploying TechSierra Solutions to production..."

# SSH to server and pull latest changes
ssh root@104.248.23.145 "cd /opt/tech-sierra-portfolio && git pull origin master"

echo "Deployment complete!"
echo "Visit: https://techsierrasolutions.com"
