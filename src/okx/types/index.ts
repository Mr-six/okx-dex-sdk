import { Wallet } from '../core/wallet';
import { EVMWallet } from '../core/evm-wallet';

// Base token info from API
export interface TokenInfo {
    decimal: string;
    isHoneyPot: boolean;
    taxRate: string;
    tokenContractAddress: string;
    tokenSymbol: string;
    tokenUnitPrice: string;
}

// Add new interface for transaction confirmation
interface TransactionConfirmation {
    signature: string;
    success: boolean;
    error?: string;
}

// For /all-tokens endpoint - keep both for backward compatibility
export type TokenInfoList = TokenInfo;
export type TokenListInfo = TokenListResponse;

// Token list response
export interface TokenListResponse {
    decimals: string;
    tokenContractAddress: string;
    tokenLogoUrl?: string;
    tokenName?: string;
    tokenSymbol: string;
}

// Update RouterResult to match the full structure
export interface RouterResult {
    chainId: string;
    dexRouterList: DexRouter[];
    estimateGasFee: string;
    fromToken: TokenInfo;
    toToken: TokenInfo;
    fromTokenAmount: string;
    toTokenAmount: string;
    priceImpactPercentage: string;
    quoteCompareList: ComparisonQuote[];
    tradeFee: string;
}

// For quote and swap responses
export interface DexProtocol {
    dexName: string;
    percent: string;
}

export interface SubRouterInfo {
    dexProtocol: DexProtocol[];
    fromToken: TokenInfo;
    toToken: TokenInfo;
}

export interface DexRouter {
    router: string;
    routerPercent: string;
    subRouterList: SubRouterInfo[];
}

export interface ComparisonQuote {
    amountOut: string;
    dexLogo: string;
    dexName: string;
    tradeFee: string;
}

// Direct quote response structure
export interface QuoteData {
    chainId: string;
    dexRouterList: DexRouter[];
    estimateGasFee: string;
    fromToken: TokenInfo;
    toToken: TokenInfo;
    fromTokenAmount: string;
    toTokenAmount: string;
    priceImpactPercentage: string;
    quoteCompareList: ComparisonQuote[];
    tradeFee: string;
    routerResult?: RouterResult;
    tx?: TransactionData;
}

// Liquidity source response structure
export interface LiquidityData {
    id: string;
    name: string;
    logo: string;
}

// Token list response structure
export interface TokenData {
    decimals: string;
    tokenContractAddress: string;
    tokenLogoUrl: string;
    tokenName: string;
    tokenSymbol: string;
}

export interface ChainData {
    chainId: string;
    chainName: string;
    dexTokenApproveAddress: string | null;
}

// New interface specifically for swap responses
export interface SwapResponseData {
    data: {
        routerResult: {
            chainId: string;
            dexRouterList: DexRouter[];
            estimateGasFee: string;
            fromToken: TokenInfo;
            toToken: TokenInfo;
            fromTokenAmount: string;
            toTokenAmount: string;
            priceImpactPercentage: string;
            quoteCompareList: ComparisonQuote[];
            tradeFee: string;
        };
        tx?: TransactionData;
    }[];
    code: string;
    msg: string;
}

// Update getSwapData and executeSolanaSwap to use this
export interface SwapExecutionData {
    routerResult: {
        chainId: string;
        dexRouterList: DexRouter[];
        estimateGasFee: string;
        fromToken: TokenInfo;
        toToken: TokenInfo;
        fromTokenAmount: string;
        toTokenAmount: string;
        priceImpactPercentage: string;
        quoteCompareList: ComparisonQuote[];
        tradeFee: string;
    };
    tx?: TransactionData;
}

// Extract common transaction data interface
export interface TransactionData {
    data: string;
    from: string;
    gas: string;
    gasPrice: string;
    maxPriorityFeePerGas: string;
    minReceiveAmount: string;
    signatureData: string[];
    slippage: string;
    to: string;
    value: string;
}

export interface APIResponse<T> {
    code: string;
    msg: string;
    data: T[];
}

// Configuration interfaces
export interface SolanaConfig {
    wallet: Wallet;
    computeUnits?: number;
    maxRetries?: number;
}

export interface SuiConfig {
    privateKey: string;
    walletAddress: string;
    connection?: {
        rpcUrl: string;
        wsEndpoint?: string;
    };
}

// src/types.ts
export interface EVMConfig {
    wallet?: EVMWallet;
}

// Add configuration interfaces for chain-specific settings
export interface ChainConfig {
    id: string;
    explorer: string;
    defaultSlippage: string;
    maxSlippage: string;
    computeUnits?: number;
    confirmationTimeout?: number;
    maxRetries?: number;
    dexContractAddress?: string;
}

export interface NetworkConfigs {
    [chainId: string]: ChainConfig;
}

// Update OKXConfig to include network configs
export interface OKXConfig {
    apiKey: string;
    secretKey: string;
    apiPassphrase: string;
    projectId: string;
    baseUrl?: string;
    networks?: NetworkConfigs;
    solana?: SolanaConfig;
    sui?: SuiConfig;
    evm?: EVMConfig;
    timeout?: number;
    maxRetries?: number;
    httpsAgent?: any; // For custom HTTPS agent if needed
}

// Generic request params
export interface APIRequestParams {
    [key: string]: string | undefined;
}

// Slippage options
export interface SlippageOptions {
    slippage?: string;
    autoSlippage?: boolean;
    maxAutoSlippage?: string;
}

// Request params
export interface BaseParams {
    chainId: string;
    chainIndex?: string;
    fromTokenAddress: string;
    toTokenAddress: string;
    amount: string;
    userWalletAddress?: string;
    dexIds?: string;
    directRoute?: boolean;
    priceImpactProtectionPercentage?: string;
    feePercent?: string;
}

export interface SwapParams extends BaseParams {
    slippage?: string;
    autoSlippage?: boolean;
    maxAutoSlippage?: string;
    swapReceiverAddress?: string;
    fromTokenReferrerWalletAddress?: string;
    toTokenReferrerWalletAddress?: string;
    positiveSlippagePercent?: string;
    gasLimit?: string;
    gasLevel?: string;
    computeUnitPrice?: string;
    computeUnitLimit?: string;
    callDataMemo?: string;
    gasMultiplier?: number;
    waitForConfirmation?: boolean;
}

export interface SwapSimulationParams {
    fromAddress: string;
    toAddress: string;
    chainIndex: string;
    txAmount: string;
    extJson: {
        inputData: string;
    };
    gasPrice: string;
    includeDebug: boolean;
}

export interface QuoteParams extends BaseParams {
    slippage: string;
}

// Update SwapResult interface to include more details
export interface SwapResult {
    success: boolean;
    transactionId: string;
    explorerUrl: string;
    details?: {
        fromToken: {
            symbol: string;
            amount: string;
            decimal: string;
        };
        toToken: {
            symbol: string;
            amount: string;
            decimal: string;
        };
        priceImpact: string;
    };
}

// Frontend formatted response
export interface FormattedSwapResponse {
    success: boolean;
    quote: {
        fromToken: {
            symbol: string;
            amount: string;
            decimal: string;
            unitPrice: string;
        };
        toToken: {
            symbol: string;
            amount: string;
            decimal: string;
            unitPrice: string;
        };
        priceImpact: string;
        dexRoutes: {
            dex: string;
            amountOut: string;
            fee: string;
        }[];
    };
    summary: string;
    tx?: {
        data: string;
    };
}

export interface ApproveTokenParams {
    chainId: string;
    tokenContractAddress: string;
    approveAmount: string;
    gasMultiplier?: number;
}

export interface ApproveTokenResult {
    success: boolean;
    transactionHash: string;
    explorerUrl: string;
}
