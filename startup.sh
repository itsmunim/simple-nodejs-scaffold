#!/bin/bash
#
# This script supports the following environment vars:
#  - WEB_MEMORY: the amount of memory each
#    process is expected to consume, in MB.

if [[ -n "$WEB_MEMORY" ]]; then
  # The heap contains two main areas:
  #
  # New Space: all newly allocated objects are created here first.
  # The new space is often small (typically 1-8 MB), and it is
  # fast to collect garbage here.
  #
  # Old Space: any objects which are not garbage collected from
  # New Space eventually end up here. The vast majority of your
  # heap will be consumed by Old Space. Garbage collection is slower
  # here, as the size of Old Space is much larger than New Space,
  # and a different mechanism is employed to actually perform the collection.
  #
  # For this reason, garbage collection is only performed when there is not
  # much room left in Old Space. So, it makes sense to concentrate on the
  # heap’s Old Space when targeting memory usage.


  # The WEB_MEMORY environment variable is set. Set the `mem_old_space_size`
  # flag to 4/5 of the available memory. 4/5 has been determined via trial
  # and error to be the optimum value, to try and ensure that v8 uses the
  # available memory.
  mem_node_old_space=$((($WEB_MEMORY*4)/5))
  echo "Provided memory: $WEB_MEMORY, Memory for Old Space: $mem_node_old_space"
  node_args="--max_old_space_size=$mem_node_old_space $node_args"
fi

export NODE_OPTIONS=${node_args}
export DEBUG=formatWebApp:*

echo "Starting app:"
echo "> npm start"

# Start the process using `exec`. This ensures that when node exits, the exit
# code is passed up to the caller of this script.
exec npm start