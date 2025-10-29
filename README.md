# Lux Network Brand Guidelines

**Official brand assets and guidelines for Lux Network**

> High-performance blockchain with multi-consensus architecture and post-quantum security

## Quick Reference

- **Primary Color**: `#3498DB` (Azure Blue)
- **Secondary Color**: `#2980B9` (Ocean Blue)
- **Accent Color**: `#F1C40F` (Gold)
- **Logo**: Available in `/assets/logos/`
- **Typography**: Inter (primary), JetBrains Mono (code)
- **Voice**: Professional, secure, innovative

## Directory Structure

```
lux-brand/
├── README.md                    # This file
├── guidelines/
│   ├── logo-usage.md           # Logo usage rules
│   ├── colors.md               # Color palette and usage
│   ├── typography.md           # Font selection and hierarchy
│   ├── voice-tone.md           # Brand voice and messaging
│   └── design-system.md        # Design principles and patterns
├── assets/
│   ├── logos/
│   │   ├── lux-logo.svg        # Primary logo (vector)
│   │   ├── lux-logo.png        # Primary logo (raster)
│   │   ├── lux-icon.svg        # Icon only
│   │   ├── lux-wordmark.svg    # Wordmark only
│   │   └── variations/         # Dark mode, monochrome, etc.
│   ├── colors/
│   │   └── palette.json        # Color definitions
│   ├── fonts/
│   │   └── README.md           # Font licensing and sources
│   └── templates/
│       ├── slide-deck.pptx     # Presentation template
│       └── social-media/       # Social media templates
└── CHANGELOG.md                # Brand evolution history
```

## Core Brand Identity

### Mission
Building scalable blockchain infrastructure with multi-consensus architecture, post-quantum security, and seamless interoperability for next-generation decentralized applications.

### Vision
A world where blockchain infrastructure is as reliable, scalable, and secure as traditional financial systems, enabling mainstream adoption of decentralized technologies.

### Values
- **Security**: Post-quantum cryptography and robust consensus
- **Performance**: High throughput without sacrificing decentralization
- **Interoperability**: Seamless cross-chain communication
- **Reliability**: Battle-tested infrastructure for production use
- **Innovation**: Novel consensus mechanisms and VM architectures

## Brand Positioning

**Target Audience**:
- Blockchain developers and architects
- DeFi protocols and applications
- Enterprise blockchain teams
- Institutional investors
- Cross-chain infrastructure projects

**Key Differentiators**:
- Multi-consensus architecture (Snow family + custom)
- Post-quantum cryptography built-in
- High-performance virtual machines (AVM, PlatformVM, CoreVM)
- Proven track record with production networks
- Not affiliated with Ava Labs or any Snow* projects

## Visual Identity

### Logo Philosophy
The Lux logo represents light, clarity, and transparency—core blockchain values. The blue palette conveys trust, security, and professional reliability. Gold accents suggest value and premium quality.

### Color System
- **Azure Blue** (`#3498DB`): Trust, technology, clarity
- **Ocean Blue** (`#2980B9`): Depth, security, stability
- **Gold Accent** (`#F1C40F`): Value, premium, achievement

### Typography
- **Inter**: Professional sans-serif for corporate communications
- **JetBrains Mono**: Technical documentation and code samples

## Usage Guidelines

### Do's ✅
- Use official logos from this repository
- Emphasize security and performance
- Highlight multi-consensus architecture
- Reference post-quantum cryptography features
- Link to lux.network as primary web presence

### Don'ts ❌
- Don't modify logo proportions or colors
- Don't confuse Lux with Ava Labs or Avalanche
- Don't use Snow consensus branding (we have our own)
- Don't imply any affiliation with Snow* projects
- Don't use outdated branding from legacy systems

## Technical Identity

### Consensus
- **Custom consensus engines** (not Snow family)
- Multi-consensus support for different use cases
- High throughput with sub-second finality

### Cryptography
- **Post-quantum cryptography**: Prepared for quantum computing era
- Modern signature schemes
- Hardware security module (HSM) integration

### Virtual Machines
- **AVM**: Asset Virtual Machine for token management
- **PlatformVM**: Staking, validation, and governance
- **CoreVM**: Custom smart contract execution

## Digital Presence

- **Website**: https://lux.network
- **GitHub**: https://github.com/luxfi
- **Papers**: https://papers.lux.network
- **Documentation**: https://docs.lux.network
- **Explorer**: https://explorer.lux.network

## Related Organizations

Lux Network integrates with:
- **Hanzo AI**: AI compute marketplace settlement layer
- **Zoo Labs**: Decentralized training infrastructure
- **Zen LM**: Language models for blockchain applications

## Important Notes

### ⚠️ No Ava Labs Packages
- **DO NOT** use any `ava-labs/*` packages
- **DO NOT** use `go-ethereum` (use `luxfi/geth`)
- **DO NOT** call Lux "Avalanche" or reference Snow consensus
- **WE HAVE** our own consensus, crypto, and database packages

### Package Usage
✅ **Use**: `luxfi/*` packages only  
❌ **Avoid**: Any external blockchain packages

## License

Brand assets are © 2024 Lux Network. Usage permitted for:
- Official Lux Network projects and communications
- Applications building on Lux blockchain (with attribution)
- Educational and research purposes (with citation)

Commercial use of brand assets requires written permission.

## Contact

For brand guidelines questions or asset requests:
- **Email**: foundation@zoo.ai
- **GitHub Issues**: https://github.com/luxfi/brand/issues

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for brand evolution history.

---

**Last Updated**: 2025-10-29  
**Version**: 1.0.0  
**Important**: Independent from Ava Labs—use only luxfi packages
