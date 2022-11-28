/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: 'doc',
      label: 'NodeJS SDK',
      id: 'documents/Introduction',
    },
    {
      type: 'doc',
      label: 'Set Up',
      id: 'documents/Installation',
    },
    {
      type: 'category',
      label: 'Technical Docs',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'nodejs-sdk-references',
      },
      items: [
        // {
        //   type: 'category',
        //   label: 'Module: API Utils',
        //   collapsed: true,
        //   link: {
        //     type: 'doc',
        //     id: 'moralisweb3/api-utils/index',
        //   },
        //   items: [
        //     {
        //       type: 'doc',
        //       label: 'ApiPaginatedResultAdapter',
        //       id: 'moralisweb3/api-utils/apipaginatedresultadapter',
        //     },
        //     {
        //       type: 'doc',
        //       label: 'ApiResultAdapter',
        //       id: 'moralisweb3/api-utils/apiresultadapter',
        //     },
        //   ],
        // },
        {
          type: 'category',
          label: 'Module: Auth Utils',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'moralisweb3/common-auth-utils/index',
          },
          items: [],
        },
        {
          type: 'category',
          label: 'Module: Core',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'moralisweb3/common-core/index',
          },
          items: [
            {
              type: 'doc',
              label: 'ApiModule',
              id: 'moralisweb3/common-core/apimodule',
            },
            {
              type: 'doc',
              label: 'BigNumber',
              id: 'moralisweb3/common-core/bignumber',
            },
            {
              type: 'doc',
              label: 'Core',
              id: 'moralisweb3/common-core/core',
            },
            {
              type: 'doc',
              label: 'EvmChainable',
              id: 'moralisweb3/common-core/evmchainable',
            },
            {
              type: 'doc',
              label: 'LoggerController',
              id: 'moralisweb3/common-core/loggercontroller',
            },
            {
              type: 'doc',
              label: 'Module',
              id: 'moralisweb3/common-core/module',
            },
            {
              type: 'doc',
              label: 'Modules',
              id: 'moralisweb3/common-core/modules',
            },
            {
              type: 'doc',
              label: 'RequestController',
              id: 'moralisweb3/common-core/requestcontroller',
            },
          ],
        },
        {
          type: 'category',
          label: 'Module: EVM Utils',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'moralisweb3/common-evm-utils/index',
          },
          items: [
            {
              type: 'doc',
              label: 'Erc20Data',
              id: 'moralisweb3/common-evm-utils/erc20data',
            },
            {
              type: 'doc',
              label: 'Erc20Input',
              id: 'moralisweb3/common-evm-utils/erc20input',
            },
            {
              type: 'doc',
              label: 'Erc20Token',
              id: 'moralisweb3/common-evm-utils/erc20token',
            },
            {
              type: 'doc',
              label: 'Erc20Transfer',
              id: 'moralisweb3/common-evm-utils/erc20transfer',
            },
            {
              type: 'doc',
              label: 'Erc20TransferData',
              id: 'moralisweb3/common-evm-utils/erc20transferdata',
            },
            {
              type: 'doc',
              label: 'Erc20TransferInput',
              id: 'moralisweb3/common-evm-utils/erc20transferinput',
            },
            {
              type: 'doc',
              label: 'Erc20Value',
              id: 'moralisweb3/common-evm-utils/erc20value',
            },
            {
              type: 'doc',
              label: 'EvmAddress',
              id: 'moralisweb3/common-evm-utils/evmaddress',
            },
            {
              type: 'doc',
              label: 'EvmBlock',
              id: 'moralisweb3/common-evm-utils/evmblock',
            },
            {
              type: 'doc',
              label: 'EvmBlockdata',
              id: 'moralisweb3/common-evm-utils/evmblockdata',
            },
            {
              type: 'doc',
              label: 'EvmBlockInput',
              id: 'moralisweb3/common-evm-utils/evmblockinput',
            },
            {
              type: 'doc',
              label: 'EvmChain',
              id: 'moralisweb3/common-evm-utils/evmchain',
            },
            {
              type: 'doc',
              label: 'EvmEvent',
              id: 'moralisweb3/common-evm-utils/evmevent',
            },
            {
              type: 'doc',
              label: 'EvmEventData',
              id: 'moralisweb3/common-evm-utils/evmeventdata',
            },
            {
              type: 'doc',
              label: 'EvmEventInput',
              id: 'moralisweb3/common-evm-utils/evmeventinput',
            },
            {
              type: 'doc',
              label: 'EvmNative',
              id: 'moralisweb3/common-evm-utils/evmnative',
            },
            {
              type: 'doc',
              label: 'EvmNft',
              id: 'moralisweb3/common-evm-utils/evmnft',
            },
            {
              type: 'doc',
              label: 'EvmNftCollection',
              id: 'moralisweb3/common-evm-utils/evmnftcollection',
            },
            {
              type: 'doc',
              label: 'EvmNftCollectionData',
              id: 'moralisweb3/common-evm-utils/evmnftcollectiondata',
            },
            {
              type: 'doc',
              label: 'EvmNftCollectionInput',
              id: 'moralisweb3/common-evm-utils/evmnftcollectioninput',
            },
            {
              type: 'doc',
              label: 'EvmNftData',
              id: 'moralisweb3/common-evm-utils/evmnftdata',
            },
            {
              type: 'doc',
              label: 'EvmNftInput',
              id: 'moralisweb3/common-evm-utils/evmnftinput',
            },
            {
              type: 'doc',
              label: 'EvmNftMetadata',
              id: 'moralisweb3/common-evm-utils/evmnftmetadata',
            },
            {
              type: 'doc',
              label: 'EvmNftMetadataData',
              id: 'moralisweb3/common-evm-utils/evmnftmetadatadata',
            },
            {
              type: 'doc',
              label: 'EvmNftMetadataInput',
              id: 'moralisweb3/common-evm-utils/evmnftmetadatainput',
            },
            {
              type: 'doc',
              label: 'EvmNftTrade',
              id: 'moralisweb3/common-evm-utils/evmnfttrade',
            },
            {
              type: 'doc',
              label: 'EvmNftTradeData',
              id: 'moralisweb3/common-evm-utils/evmnfttradedata',
            },
            {
              type: 'doc',
              label: 'EvmNftTradeInput',
              id: 'moralisweb3/common-evm-utils/evmnfttradeinput',
            },
            {
              type: 'doc',
              label: 'EvmNftTransfer',
              id: 'moralisweb3/common-evm-utils/evmnfttransfer',
            },
            {
              type: 'doc',
              label: 'EvmNftTransferData',
              id: 'moralisweb3/common-evm-utils/evmnfttransferdata',
            },
            {
              type: 'doc',
              label: 'EvmNftTransferInput',
              id: 'moralisweb3/common-evm-utils/evmnfttransferinput',
            },
            {
              type: 'doc',
              label: 'EvmSignature',
              id: 'moralisweb3/common-evm-utils/evmsignature',
            },
            {
              type: 'doc',
              label: 'EvmSimpleBlock',
              id: 'moralisweb3/common-evm-utils/evmsimpleblock',
            },
            {
              type: 'doc',
              label: 'EvmSimpleBlockData',
              id: 'moralisweb3/common-evm-utils/evmsimpleblockdata',
            },
            {
              type: 'doc',
              label: 'EvmSimpleBlockInput',
              id: 'moralisweb3/common-evm-utils/evmsimpleblockinput',
            },
            {
              type: 'doc',
              label: 'EvmTransaction',
              id: 'moralisweb3/common-evm-utils/evmtransaction',
            },
            {
              type: 'doc',
              label: 'EvmTransactionData',
              id: 'moralisweb3/common-evm-utils/evmtransactiondata',
            },
            {
              type: 'doc',
              label: 'EvmTransactionInput',
              id: 'moralisweb3/common-evm-utils/evmtransactioninput',
            },
            {
              type: 'doc',
              label: 'EvmTransactionLog',
              id: 'moralisweb3/common-evm-utils/evmtransactionlog',
            },
            {
              type: 'doc',
              label: 'EvmTransactionLogData',
              id: 'moralisweb3/common-evm-utils/evmtransactionlogdata',
            },
            {
              type: 'doc',
              label: 'EvmTransactionLogInput',
              id: 'moralisweb3/common-evm-utils/evmtransactionloginput',
            },
          ],
        },
        {
          type: 'category',
          label: 'Module: SOL Utils',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'moralisweb3/common-sol-utils/index',
          },
          items: [
            {
              type: 'doc',
              label: 'SolAddress',
              id: 'moralisweb3/common-sol-utils/soladdress',
            },
            {
              type: 'doc',
              label: 'SolNative',
              id: 'moralisweb3/common-sol-utils/solnative',
            },
            {
              type: 'doc',
              label: 'SolNetwork',
              id: 'moralisweb3/common-sol-utils/solnetwork',
            },
          ],
        },
        {
          type: 'category',
          label: 'Module: Stream Utils',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'moralisweb3/common-streams-utils/index',
          },
          items: [
            {
              type: 'doc',
              label: 'EvmStream',
              id: 'moralisweb3/common-streams-utils/evmstream',
            },
            {
              type: 'doc',
              label: 'EvmStreamResult',
              id: 'moralisweb3/common-streams-utils/evmstreamresult',
            },
            {
              type: 'doc',
              label: 'StreamErc20Approval',
              id: 'moralisweb3/common-streams-utils/streamerc20approval',
            },
            {
              type: 'doc',
              label: 'StreamErc20Transfer',
              id: 'moralisweb3/common-streams-utils/streamerc20transfer',
            },
            {
              type: 'doc',
              label: 'StreamErc721Approval',
              id: 'moralisweb3/common-streams-utils/streamerc721approval',
            },
            {
              type: 'doc',
              label: 'StreamErc1155Approval',
              id: 'moralisweb3/common-streams-utils/streamerc1155approval',
            },
            {
              type: 'doc',
              label: 'StreamEvmInternalTransaction',
              id: 'moralisweb3/common-streams-utils/streamevminternaltransaction',
            },
            {
              type: 'doc',
              label: 'StreamEvmNftTransfer',
              id: 'moralisweb3/common-streams-utils/streamevmnfttransfer',
            },
            {
              type: 'doc',
              label: 'StreamEvmTransaction',
              id: 'moralisweb3/common-streams-utils/streamevmtransaction',
            },
            {
              type: 'doc',
              label: 'StreamEvmTransactionLog',
              id: 'moralisweb3/common-streams-utils/streamevmtransactionlog',
            },
          ],
        },
        {
          type: 'category',
          label: 'Module: Test Utils',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'moralisweb3/test-utils/index',
          },
          items: [
            {
              type: 'doc',
              label: 'MockScenarios',
              id: 'moralisweb3/test-utils/mockscenarios',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Demos',
      items: [
        'demos/cli',
        'demos/express-proxy',
        'demos/firebase-auth-ext',
        'demos/firebase-proxy',
        'demos/firebase-streams-ext',
        'demos/moralis-stream',
        'demos/nextjs',
        'demos/parse-server',
        'demos/parse-server-migration',
        'demos/parse-server-migration-react-client',
        'demos/supabase-auth',
      ],
    },
    {
      type: 'doc',
      label: 'Contributing',
      id: 'documents/CONTRIBUTING',
    },
    {
      type: 'link',
      label: 'GitHub',
      href: 'https://github.com/MoralisWeb3/Moralis-JS-SDK',
    },
  ],
};

module.exports = sidebars;
