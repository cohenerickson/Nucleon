# Nucleon

## Getting Started

### Installing Prerequisites

You can skip these steps if you already have the prerequisites installed.

```bash
# GCC
sudo apt update
sudo apt install build-essential

# Rust & Rust Nightly
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup toolchain install nightly

# NodeJS
sudo apt install nodejs

# PNPM
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Downloading Source

Download and install node dependencies

```bash
git clone --recurse-submodules https://github.com/cohenerickson/Nucleon.git
cd Nucleon
pnpm ci
```

### Build Dependencies

```bash
cd epoxy-tls/server
cargo b -r
```
