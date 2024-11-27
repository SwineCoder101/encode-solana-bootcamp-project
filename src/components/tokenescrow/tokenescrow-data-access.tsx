'use client'

import {getTokenescrowProgram, getTokenescrowProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useTokenescrowProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getTokenescrowProgramId(cluster.network as Cluster), [cluster])
  const program = getTokenescrowProgram(provider)

  const accounts = useQuery({
    queryKey: ['tokenescrow', 'all', { cluster }],
    queryFn: () => program.account.tokenescrow.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['tokenescrow', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ tokenescrow: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useTokenescrowProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useTokenescrowProgram()

  const accountQuery = useQuery({
    queryKey: ['tokenescrow', 'fetch', { cluster, account }],
    queryFn: () => program.account.tokenescrow.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['tokenescrow', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ tokenescrow: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['tokenescrow', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ tokenescrow: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['tokenescrow', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ tokenescrow: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['tokenescrow', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ tokenescrow: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
